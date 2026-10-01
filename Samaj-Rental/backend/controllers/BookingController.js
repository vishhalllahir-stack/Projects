import Booking from "../models/Booking.js";
import Item from "../models/Item.js";
import Bill from "../models/Bill.js";
import { createBill } from "./BillControllers.js";
import mongoose from "mongoose";

/* =====================================================
   CREATE BOOKING
===================================================== */

export const createBooking = async (
  req,
  res
) => {
  try {
    const {
      customerName,
      mobile,
      village,
      bookingDate,
      returnDate,
      items,
      notes,
    } = req.body;

    /* ================================================
       BASIC VALIDATION
    ================================================= */

    if (
      !customerName ||
      !mobile ||
      !village ||
      !bookingDate ||
      !returnDate ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message:
          "Please fill all required fields",
      });
    }

    const cleanCustomerName =
      String(customerName).trim();

    const cleanMobile =
      String(mobile).replace(
        /\D/g,
        ""
      );

    const cleanVillage =
      String(village).trim();

    const cleanNotes =
      typeof notes === "string"
        ? notes.trim()
        : "";

    /* ================================================
       CUSTOMER VALIDATION
    ================================================= */

    if (
      cleanCustomerName.length < 2
    ) {
      return res.status(400).json({
        message:
          "Customer name must contain at least 2 characters",
      });
    }

    if (
      !/^\d{10}$/.test(cleanMobile)
    ) {
      return res.status(400).json({
        message:
          "Mobile number must be exactly 10 digits",
      });
    }

    if (!cleanVillage) {
      return res.status(400).json({
        message:
          "Village is required",
      });
    }

    if (cleanNotes.length > 500) {
      return res.status(400).json({
        message:
          "Notes cannot exceed 500 characters",
      });
    }

    /* ================================================
       DATE VALIDATION
    ================================================= */

    const startDate = new Date(
      `${bookingDate}T00:00:00`
    );

    const endDate = new Date(
      `${returnDate}T00:00:00`
    );

    if (
      Number.isNaN(
        startDate.getTime()
      ) ||
      Number.isNaN(
        endDate.getTime()
      )
    ) {
      return res.status(400).json({
        message:
          "Invalid booking dates",
      });
    }

    if (startDate >= endDate) {
      return res.status(400).json({
        message:
          "Return date must be after booking date",
      });
    }

    /* ================================================
       PREVENT PAST BOOKING
    ================================================= */

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    if (startDate < today) {
      return res.status(400).json({
        message:
          "Booking date cannot be in the past",
      });
    }

    /* ================================================
       RENTAL DAYS
    ================================================= */

    const difference =
      endDate.getTime() -
      startDate.getTime();

    const rentalDays =
      Math.ceil(
        difference /
          (1000 * 60 * 60 * 24)
      );

    if (rentalDays <= 0) {
      return res.status(400).json({
        message:
          "Rental days must be at least 1",
      });
    }

    /* ================================================
       ITEM VALIDATION
    ================================================= */

    const finalItems = [];

    let finalTotalAmount = 0;

    const requestedItemIds =
      new Set();

    for (
      const requestedItem of items
    ) {
      /* ==========================================
         ITEM ID
      ========================================== */

      if (
        !requestedItem?.itemId ||
        !mongoose.Types.ObjectId.isValid(
          requestedItem.itemId
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid item ID",
        });
      }

      const itemId =
        requestedItem.itemId.toString();

      /* ==========================================
         DUPLICATE ITEM CHECK
      ========================================== */

      if (
        requestedItemIds.has(
          itemId
        )
      ) {
        return res.status(400).json({
          message:
            "Same item cannot be added multiple times in one booking",
        });
      }

      requestedItemIds.add(
        itemId
      );

      /* ==========================================
         QUANTITY
      ========================================== */

      const quantity = Number(
        requestedItem.quantity
      );

      if (
        !Number.isInteger(
          quantity
        ) ||
        quantity <= 0
      ) {
        return res.status(400).json({
          message:
            "Item quantity must be a positive number",
        });
      }

      /* ==========================================
         FIND ITEM
      ========================================== */

      const item =
        await Item.findById(
          requestedItem.itemId
        );

      if (!item) {
        return res.status(404).json({
          message:
            "Item not found",
        });
      }

      /* ==========================================
         ITEM AVAILABILITY
      ========================================== */

      if (
        item.isAvailable === false
      ) {
        return res.status(400).json({
          message:
            `${item.name} હાલમાં available નથી.`,
        });
      }

      const totalQuantity =
        Number(
          item.totalQuantity || 0
        );

      if (
        totalQuantity <= 0
      ) {
        return res.status(400).json({
          message:
            `${item.name} out of stock છે.`,
        });
      }

      /* ==========================================
         OVERLAPPING BOOKINGS
      ========================================== */

      const overlappingBookings =
        await Booking.find({
          status: {
            $in: [
              "pending",
              "confirmed",
            ],
          },

          bookingDate: {
            $lt: endDate,
          },

          returnDate: {
            $gt: startDate,
          },

          "items.itemId":
            item._id,
        }).lean();

      let alreadyBookedQuantity = 0;

      for (
        const booking of overlappingBookings
      ) {
        const bookingItems =
          Array.isArray(
            booking.items
          )
            ? booking.items
            : [];

        for (
          const bookingItem of bookingItems
        ) {
          if (
            bookingItem?.itemId &&
            bookingItem.itemId.toString() ===
              item._id.toString()
          ) {
            alreadyBookedQuantity +=
              Number(
                bookingItem.quantity ||
                  0
              );
          }
        }
      }

      /* ==========================================
         AVAILABLE STOCK
      ========================================== */

      const availableQuantity =
        Math.max(
          totalQuantity -
            alreadyBookedQuantity,
          0
        );

      if (
        quantity >
        availableQuantity
      ) {
        return res.status(400).json({
          message:
            `${item.name} માટે selected dates માં માત્ર ${availableQuantity} quantity available છે.`,
        });
      }

      /* ==========================================
         PRICE
      ========================================== */

      const pricePerDay =
        Number(
          item.pricePerDay || 0
        );

      if (
        !Number.isFinite(
          pricePerDay
        ) ||
        pricePerDay < 0
      ) {
        return res.status(400).json({
          message:
            `${item.name} ની price invalid છે.`,
        });
      }

      /* ==========================================
         ITEM AMOUNT
      ========================================== */

      const amount =
        pricePerDay *
        quantity *
        rentalDays;

      finalItems.push({
        itemId: item._id,

        name:
          item.name,

        pricePerDay,

        quantity,

        amount,
      });

      finalTotalAmount +=
        amount;
    }

    /* ================================================
       CREATE BOOKING
    ================================================= */

    const booking =
      await Booking.create({
        userId: req.user.id,

        customerName:
          cleanCustomerName,

        mobile:
          cleanMobile,

        village:
          cleanVillage,

        bookingDate:
          startDate,

        returnDate:
          endDate,

        items:
          finalItems,

        totalAmount:
          finalTotalAmount,

        notes:
          cleanNotes,

        status:
          "pending",
      });

    /* ================================================
       RESPONSE
    ================================================= */

    res.status(201).json({
      message:
        "Booking created successfully",

      booking,
    });
  } catch (error) {
    console.error(
      "Create Booking Error:",
      error
    );

    res.status(500).json({
      message:
        "Booking creation failed",
    });
  }
};


/* =====================================================
   GET MY BOOKINGS
===================================================== */

export const getMyBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await Booking.find({
        userId: req.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    const bookingIds =
      bookings.map(
        (booking) =>
          booking._id
      );

    /* ================================================
       GET ALL BILLS AT ONCE
    ================================================= */

    const bills =
      await Bill.find({
        bookingId: {
          $in: bookingIds,
        },
      })
        .select(
          "_id bookingId"
        )
        .lean();

    const billMap =
      new Map();

    bills.forEach((bill) => {
      if (bill.bookingId) {
        billMap.set(
          bill.bookingId.toString(),
          bill._id
        );
      }
    });

    /* ================================================
       ADD BILL ID
    ================================================= */

    const bookingsWithBills =
      bookings.map(
        (booking) => ({
          ...booking,

          billId:
            billMap.get(
              booking._id.toString()
            ) || null,
        })
      );

    res.status(200).json(
      bookingsWithBills
    );
  } catch (error) {
    console.error(
      "Get My Bookings Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to load bookings",
    });
  }
};


/* =====================================================
   GET ALL BOOKINGS - ADMIN
===================================================== */

export const getAllBookings = async (
  req,
  res
) => {
  try {
    const bookings =
      await Booking.find()
        .populate(
          "userId",
          "name email mobile village"
        )
        .sort({
          createdAt: -1,
        })
        .lean();

    res.status(200).json(
      bookings
    );
  } catch (error) {
    console.error(
      "Get All Bookings Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to load bookings",
    });
  }
};


/* =====================================================
   UPDATE BOOKING STATUS - ADMIN
===================================================== */

export const updateBookingStatus =
  async (req, res) => {
    try {
      const { status } =
        req.body;

      const allowedStatus = [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
      ];

      /* ============================================
         STATUS VALIDATION
      ============================================ */

      if (
        !allowedStatus.includes(
          status
        )
      ) {
        return res.status(400).json({
          message:
            "Invalid booking status",
        });
      }

      /* ============================================
         FIND BOOKING
      ============================================ */

      const booking =
        await Booking.findById(
          req.params.id
        );

      if (!booking) {
        return res.status(404).json({
          message:
            "Booking not found",
        });
      }

      const oldStatus =
        booking.status;

      /* ============================================
         CANCELLED BOOKING
      ============================================ */

      booking.status =
        status;

      await booking.save();

      /* ============================================
         CREATE BILL ON CONFIRM
      ============================================ */

      let bill = null;

      if (
        status === "confirmed"
      ) {
        bill =
          await createBill(
            booking
          );
      }

      /* ============================================
         RESPONSE
      ============================================ */

      res.status(200).json({
        message:
          `Booking ${status} successfully`,

        booking,

        bill,

        previousStatus:
          oldStatus,
      });
    } catch (error) {
      console.error(
        "Update Booking Status Error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to update booking status",
      });
    }
  };