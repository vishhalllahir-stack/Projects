import Fee from "../models/Fee.js";
import Student from "../models/student.js";

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseAmount = (value, fallback) => {
  const amount = Number(value ?? fallback);
  return Number.isFinite(amount) ? amount : null;
};

// Get all fees
// Get all fees with search, filter, pagination and summary
export const getFees = async (req, res) => {
  try {
    const {
      search = "",
      academicYear = "",
      semester = "",
      status = "",
      page = 1,
      limit = 10,
    } = req.query;

    const requestedPage = Number(page);
    const requestedLimit = Number(limit);
    const currentPage = Number.isFinite(requestedPage)
      ? Math.max(Math.floor(requestedPage), 1)
      : 1;
    const perPage = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(Math.floor(requestedLimit), 1), 100)
      : 10;
    const skip = (currentPage - 1) * perPage;

    // -----------------------------
    // FILTER
    // -----------------------------
    const filter = {};

    if (academicYear) {
      filter.academicYear = academicYear;
    }

    if (semester) {
      filter.semester = Number(semester);
    }

    if (status) {
      filter.status = status;
    }

    // -----------------------------
    // GET FEES
    // -----------------------------
    let feesQuery = Fee.find(filter)
      .populate(
        "studentId",
        "studentId firstName lastName email course department"
      )
      .sort({ createdAt: -1 });

    // -----------------------------
    // SEARCH
    // -----------------------------
    const searchTerm = typeof search === "string" ? search.trim() : "";
    if (searchTerm) {
      const searchRegex = new RegExp(escapeRegex(searchTerm), "i");

      const students = await Student.find({
        $or: [
          { studentId: searchRegex },
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex },
          { course: searchRegex },
        ],
      }).select("_id");

      const studentIds = students.map(
        (student) => student._id
      );

      filter.$or = [
        { academicYear: searchRegex },
        { transactionId: searchRegex },
        { remarks: searchRegex },
        { studentId: { $in: studentIds } },
      ];

      feesQuery = Fee.find(filter)
        .populate(
          "studentId",
          "studentId firstName lastName email course department"
        )
        .sort({ createdAt: -1 });
    }

    const totalFeesRecords = await Fee.countDocuments(filter);

    const fees = await feesQuery
      .skip(skip)
      .limit(perPage);

    // -----------------------------
    // TOTAL PAGES
    // -----------------------------
    const totalPages =
      Math.ceil(totalFeesRecords / perPage) || 1;

    // -----------------------------
    // SUMMARY
    // -----------------------------
    const summary = await Fee.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: null,
          totalFees: {
            $sum: "$totalFees",
          },
          paidAmount: {
            $sum: "$paidAmount",
          },
          pendingAmount: {
            $sum: {
              $subtract: [
                "$totalFees",
                "$paidAmount",
              ],
            },
          },
          totalRecords: {
            $sum: 1,
          },
        },
      },
    ]);

    const summaryData = summary[0] || {
      totalFees: 0,
      paidAmount: 0,
      pendingAmount: 0,
      totalRecords: 0,
    };

    // -----------------------------
    // RESPONSE
    // -----------------------------
    res.status(200).json({
      success: true,
      data: fees,

      pagination: {
        currentPage,
        totalPages,
        totalFees: totalFeesRecords,
        perPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },

      summary: {
        totalFees: summaryData.totalFees,
        paidAmount: summaryData.paidAmount,
        pendingAmount: Math.max(
          summaryData.pendingAmount,
          0
        ),
        totalRecords: summaryData.totalRecords,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch fees",
      error: error.message,
    });
  }
};
// Get single fee
export const getFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id)
      .populate(
        "studentId",
        "studentId firstName lastName email course"
      );

    if (!fee) {
      return res.status(404).json({
        message: "Fee record not found",
      });
    }

    res.status(200).json(fee);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch fee",
      error: error.message,
    });
  }
};

// Create fee
export const createFee = async (req, res) => {
  try {
    const {
      studentId,
      academicYear,
      semester,
      totalFees,
      paidAmount,
      paymentDate,
      paymentMethod,
      transactionId,
      remarks,
    } = req.body;

    const total = parseAmount(totalFees);
    const paid = parseAmount(paidAmount, 0);

    if (
      total === null ||
      paid === null ||
      total < 0 ||
      paid < 0 ||
      paid > total
    ) {
      return res.status(400).json({
        message: "Fee amounts must be valid non-negative numbers, and paid amount cannot exceed total fees",
      });
    }

    let status = "Pending";

    if (paid === total && total > 0) {
      status = "Paid";
    } else if (paid > 0) {
      status = "Partial";
    }

    const fee = await Fee.create({
      studentId,
      academicYear,
      semester,
      totalFees: total,
      paidAmount: paid,
      paymentDate,
      paymentMethod,
      transactionId,
      remarks,
      status,
    });

    const populatedFee = await Fee.findById(
      fee._id
    ).populate(
      "studentId",
      "studentId firstName lastName email course"
    );

    res.status(201).json({
      message: "Fee record created successfully",
      fee: populatedFee,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create fee",
      error: error.message,
    });
  }
};

// Update fee
export const updateFee = async (req, res) => {
  try {
    const existingFee = await Fee.findById(req.params.id);
    if (!existingFee) {
      return res.status(404).json({
        message: "Fee record not found",
      });
    }

    const total = parseAmount(
      req.body.totalFees,
      existingFee.totalFees
    );
    const paid = parseAmount(
      req.body.paidAmount,
      existingFee.paidAmount
    );

    if (
      total === null ||
      paid === null ||
      total < 0 ||
      paid < 0 ||
      paid > total
    ) {
      return res.status(400).json({
        message: "Fee amounts must be valid non-negative numbers, and paid amount cannot exceed total fees",
      });
    }

    let status = "Pending";

    if (paid === total && total > 0) {
      status = "Paid";
    } else if (paid > 0) {
      status = "Partial";
    }

    const fee =
      await Fee.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          totalFees: total,
          paidAmount: paid,
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "studentId",
        "studentId firstName lastName email course"
      );

    res.status(200).json({
      message: "Fee updated successfully",
      fee,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update fee",
      error: error.message,
    });
  }
};

// Delete fee
export const deleteFee = async (req, res) => {
  try {
    const fee =
      await Fee.findByIdAndDelete(req.params.id);

    if (!fee) {
      return res.status(404).json({
        message: "Fee record not found",
      });
    }

    res.status(200).json({
      message: "Fee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete fee",
      error: error.message,
    });
  }
};

// Get fees by student
export const getStudentFees = async (req, res) => {
  try {
    const fees = await Fee.find({
      studentId: req.params.studentId,
    })
      .populate(
        "studentId",
        "studentId firstName lastName email course"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student fees",
      error: error.message,
    });
  }
};

export default {
  getFees,
  getFee,
  createFee,
  updateFee,
  deleteFee,
  getStudentFees,
};