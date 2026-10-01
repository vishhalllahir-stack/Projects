import Bill from "../models/Bill.js";
import PDFDocument from "pdfkit";

/* =====================================================
   CREATE BILL
===================================================== */

export const createBill = async (booking) => {
  try {
    if (!booking?._id) {
      throw new Error("Booking is required to create bill");
    }

    // Check whether bill already exists
    const existingBill = await Bill.findOne({
      bookingId: booking._id,
    });

    if (existingBill) {
      return existingBill;
    }

    // Generate unique bill number
    const billNumber =
      "BILL-" +
      Date.now() +
      "-" +
      Math.floor(1000 + Math.random() * 9000);

    const bill = await Bill.create({
      bookingId: booking._id,

      userId: booking.userId,

      billNumber,

      customerName: booking.customerName || "",

      mobile: booking.mobile || "",

      village: booking.village || "",

      bookingDate: booking.bookingDate,

      returnDate: booking.returnDate,

      items: Array.isArray(booking.items)
        ? booking.items
        : [],

      totalAmount: Number(booking.totalAmount || 0),

      generatedAt: new Date(),
    });

    return bill;
  } catch (error) {
    console.error("Create Bill Error:", error);
    throw error;
  }
};


/* =====================================================
   GET MY BILLS
===================================================== */

export const getMyBills = async (req, res) => {
  try {
    const bills = await Bill.find({
      userId: req.user.id,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    res.status(200).json(bills);
  } catch (error) {
    console.error("Get My Bills Error:", error);

    res.status(500).json({
      message: "Failed to load bills",
    });
  }
};


/* =====================================================
   GET BILL BY ID
===================================================== */

export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).lean();

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error("Get Bill By ID Error:", error);

    res.status(500).json({
      message: "Failed to load bill",
    });
  }
};


/* =====================================================
   DOWNLOAD USER BILL PDF
===================================================== */

export const downloadBillPDF = async (req, res) => {
  try {
    const bill = await Bill.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).lean();

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    generateBillPDF(bill, res, true);
  } catch (error) {
    console.error("Download Bill PDF Error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "PDF generation failed",
      });
    }
  }
};


/* =====================================================
   DOWNLOAD ADMIN BILL PDF
===================================================== */

export const downloadAdminBillPDF = async (req, res) => {
  try {
    const bill = await Bill.findById(
      req.params.id
    ).lean();

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    generateBillPDF(bill, res, false);
  } catch (error) {
    console.error("Admin Bill PDF Error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        message: "PDF generation failed",
      });
    }
  }
};


/* =====================================================
   COMMON PDF GENERATOR
===================================================== */

const generateBillPDF = (
  bill,
  res,
  includeNotes = true
) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  const filename = `${bill.billNumber || "bill"}.pdf`;

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"`
  );

  doc.pipe(res);


  /* =================================================
     HEADER
  ================================================= */

  doc
    .fontSize(25)
    .font("Helvetica-Bold")
    .fillColor("#000000")
    .text(
      "SAMAJ RENTAL SYSTEM",
      {
        align: "center",
      }
    );

  doc
    .moveDown(0.3)
    .fontSize(11)
    .font("Helvetica")
    .fillColor("#555555")
    .text(
      "Community Rental & Booking Service",
      {
        align: "center",
      }
    );

  doc.moveDown(1);


  /* =================================================
     BILL TITLE
  ================================================= */

  doc
    .fillColor("#000000")
    .fontSize(20)
    .font("Helvetica-Bold")
    .text(
      "RENTAL BILL",
      {
        align: "center",
      }
    );

  doc.moveDown(0.5);

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(
      `Bill Number: ${
        bill.billNumber || "-"
      }`,
      {
        align: "center",
      }
    );

  doc.text(
    `Generated: ${formatDateTime(
      bill.generatedAt
    )}`,
    {
      align: "center",
    }
  );

  doc.moveDown(1);

  drawLine(doc);

  doc.moveDown(0.7);


  /* =================================================
     CUSTOMER DETAILS
  ================================================= */

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .fillColor("#000000")
    .text("Customer Details");

  doc.moveDown(0.4);

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(
      `Name: ${
        bill.customerName || "-"
      }`
    );

  doc.text(
    `Mobile: ${
      bill.mobile || "-"
    }`
  );

  doc.text(
    `Village: ${
      bill.village || "-"
    }`
  );

  doc.moveDown(0.8);


  /* =================================================
     RENTAL DETAILS
  ================================================= */

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Rental Details");

  doc.moveDown(0.4);

  doc
    .fontSize(11)
    .font("Helvetica")
    .text(
      `Booking Date: ${formatDate(
        bill.bookingDate
      )}`
    );

  doc.text(
    `Return Date: ${formatDate(
      bill.returnDate
    )}`
  );

  const rentalDays =
    calculateRentalDays(
      bill.bookingDate,
      bill.returnDate
    );

  doc.text(
    `Rental Days: ${rentalDays}`
  );

  doc.moveDown(1);


  /* =================================================
     RENTAL ITEMS
  ================================================= */

  doc
    .fontSize(14)
    .font("Helvetica-Bold")
    .text("Rental Items");

  doc.moveDown(0.5);

  const tableTop = doc.y;

  const xItem = 50;
  const xPrice = 300;
  const xQty = 390;
  const xAmount = 455;

  drawTableHeader(
    doc,
    tableTop,
    xItem,
    xPrice,
    xQty,
    xAmount
  );

  let currentY = tableTop + 28;

  const billItems =
    Array.isArray(bill.items)
      ? bill.items
      : [];

  billItems.forEach((item) => {
    if (currentY > 720) {
      doc.addPage();

      currentY = 60;

      drawTableHeader(
        doc,
        currentY,
        xItem,
        xPrice,
        xQty,
        xAmount
      );

      currentY += 28;
    }

    const itemName =
      item?.name || "-";

    const price =
      Number(
        item?.pricePerDay || 0
      );

    const quantity =
      Number(
        item?.quantity || 0
      );

    const calculatedAmount =
      price * quantity;

    const amount =
      Number.isFinite(
        Number(item?.amount)
      )
        ? Number(item.amount)
        : calculatedAmount;

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#000000")
      .text(
        itemName,
        xItem,
        currentY,
        {
          width: 230,
        }
      );

    doc.text(
      `Rs.${formatMoney(price)}`,
      xPrice,
      currentY
    );

    doc.text(
      String(quantity),
      xQty,
      currentY
    );

    doc.text(
      `Rs.${formatMoney(amount)}`,
      xAmount,
      currentY
    );

    currentY += 25;
  });


  /* =================================================
     TOTAL AMOUNT
  ================================================= */

  currentY += 5;

  doc
    .strokeColor("#cccccc")
    .lineWidth(1)
    .moveTo(50, currentY)
    .lineTo(545, currentY)
    .stroke();

  currentY += 15;

  doc
    .fontSize(17)
    .font("Helvetica-Bold")
    .fillColor("#000000")
    .text(
      `TOTAL AMOUNT: Rs.${formatMoney(
        bill.totalAmount
      )}`,
      50,
      currentY,
      {
        width: 495,
        align: "right",
      }
    );

  currentY += 45;


  /* =================================================
     IMPORTANT NOTES
  ================================================= */

  if (includeNotes) {
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(
        "Important Notes",
        50,
        currentY
      );

    currentY += 18;

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor("#555555")
      .text(
        "1. Please return all rented items on the agreed return date.",
        50,
        currentY
      );

    currentY += 14;

    doc.text(
      "2. Any damaged or missing item may be subject to additional charges.",
      50,
      currentY
    );

    currentY += 14;

    doc.text(
      "3. Please keep this bill for your records.",
      50,
      currentY
    );

    currentY += 30;
  }


  /* =================================================
     USER BOOKING NOTES
  ================================================= */

  if (
    bill.notes &&
    String(bill.notes).trim()
  ) {
    doc
      .fillColor("#000000")
      .fontSize(11)
      .font("Helvetica-Bold")
      .text(
        "Booking Notes",
        50,
        currentY
      );

    currentY += 17;

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor("#555555")
      .text(
        String(bill.notes),
        50,
        currentY,
        {
          width: 495,
        }
      );

    currentY += 30;
  }


  /* =================================================
     FOOTER
  ================================================= */

  doc
    .fillColor("#000000")
    .fontSize(11)
    .font("Helvetica-Bold")
    .text(
      "Thank you for using Samaj Rental System",
      50,
      currentY,
      {
        width: 495,
        align: "center",
      }
    );

  currentY += 20;

  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor("#666666")
    .text(
      "Please return all rented items in good condition.",
      50,
      currentY,
      {
        width: 495,
        align: "center",
      }
    );

  currentY += 14;

  doc
    .fontSize(9)
    .font("Helvetica")
    .fillColor("#666666")
    .text(
      "We look forward to serving you again.",
      50,
      currentY,
      {
        width: 495,
        align: "center",
      }
    );

  doc.end();
};


/* =====================================================
   TABLE HEADER
===================================================== */

const drawTableHeader = (
  doc,
  y,
  xItem,
  xPrice,
  xQty,
  xAmount
) => {
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .fillColor("#000000")
    .text(
      "Item",
      xItem,
      y
    );

  doc.text(
    "Price/Day",
    xPrice,
    y
  );

  doc.text(
    "Qty",
    xQty,
    y
  );

  doc.text(
    "Amount",
    xAmount,
    y
  );

  doc
    .strokeColor("#cccccc")
    .lineWidth(1)
    .moveTo(50, y + 18)
    .lineTo(545, y + 18)
    .stroke();
};


/* =====================================================
   CALCULATE RENTAL DAYS
===================================================== */

const calculateRentalDays = (
  bookingDate,
  returnDate
) => {
  const start =
    new Date(bookingDate);

  const end =
    new Date(returnDate);

  if (
    Number.isNaN(
      start.getTime()
    ) ||
    Number.isNaN(
      end.getTime()
    )
  ) {
    return 0;
  }

  const difference =
    end.getTime() -
    start.getTime();

  const days = Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );

  return Math.max(days, 0);
};


/* =====================================================
   FORMAT DATE
===================================================== */

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "-";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } 
  );
};


/* =====================================================
   FORMAT DATE + TIME
===================================================== */

const formatDateTime = (date) => {
  if (!date) {
    return "-";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "-";
  }

  return parsedDate.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};


/* =====================================================
   FORMAT MONEY
===================================================== */

const formatMoney = (amount) => {
  const value =
    Number(amount || 0);

  if (!Number.isFinite(value)) {
    return "0";
  }

  return value.toLocaleString(
    "en-IN"
  );
};


/* =====================================================
   DRAW LINE
===================================================== */

const drawLine = (doc) => {
  const y = doc.y;

  doc
    .strokeColor("#cccccc")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(545, y)
    .stroke();

  doc.fillColor("#000000");
};