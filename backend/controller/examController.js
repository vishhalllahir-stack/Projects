import Exam from "../models/Exam.js";

// Calculate result
const calculateResult = (marksObtained, totalMarks) => {
  const percentage = (marksObtained / totalMarks) * 100;

  let grade = "F";

  if (percentage >= 90) {
    grade = "A+";
  } else if (percentage >= 80) {
    grade = "A";
  } else if (percentage >= 70) {
    grade = "B+";
  } else if (percentage >= 60) {
    grade = "B";
  } else if (percentage >= 50) {
    grade = "C";
  } else if (percentage >= 40) {
    grade = "D";
  }

  const resultStatus = percentage >= 40 ? "Pass" : "Fail";

  return {
    percentage: Number(percentage.toFixed(2)),
    grade,
    resultStatus,
  };
};

// GET all exams
// GET all exams with search, filters, pagination and summary
export const getExams = async (req, res) => {
  try {
    const {
      search = "",
      academicYear = "",
      semester = "",
      subject = "",
      grade = "",
      resultStatus = "",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(Number(page) || 1, 1);
    const perPage = Math.max(Number(limit) || 10, 1);
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

    if (subject) {
      filter.subject = new RegExp(subject.trim(), "i");
    }

    if (grade) {
      filter.grade = grade;
    }

    if (resultStatus) {
      filter.resultStatus = resultStatus;
    }

    // -----------------------------
    // SEARCH STUDENTS
    // -----------------------------
    if (search.trim()) {
      const searchRegex = new RegExp(
        search.trim(),
        "i"
      );

      const Student = (
        await import("../models/Student.js")
      ).default;

      const students = await Student.find({
        $or: [
          { studentId: searchRegex },
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex },
          { course: searchRegex },
          { department: searchRegex },
        ],
      }).select("_id");

      const studentIds = students.map(
        (student) => student._id
      );

      filter.$or = [
        { examName: searchRegex },
        { subject: searchRegex },
        { academicYear: searchRegex },
        { remarks: searchRegex },
        {
          studentId: {
            $in: studentIds,
          },
        },
      ];
    }

    // -----------------------------
    // TOTAL RECORDS
    // -----------------------------
    const totalExams =
      await Exam.countDocuments(filter);

    // -----------------------------
    // GET EXAMS
    // -----------------------------
    const exams = await Exam.find(filter)
      .populate(
        "studentId",
        "studentId firstName lastName email course department"
      )
      .sort({
        examDate: -1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(perPage);

    // -----------------------------
    // TOTAL PAGES
    // -----------------------------
    const totalPages =
      Math.ceil(totalExams / perPage) || 1;

    // -----------------------------
    // RESULT SUMMARY
    // -----------------------------
    const summaryResult =
      await Exam.aggregate([
        {
          $match: filter,
        },
        {
          $group: {
            _id: null,

            totalExams: {
              $sum: 1,
            },

            passCount: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$resultStatus",
                      "Pass",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            failCount: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$resultStatus",
                      "Fail",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            absentCount: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$resultStatus",
                      "Absent",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            averagePercentage: {
              $avg: "$percentage",
            },
          },
        },
      ]);

    const summary = summaryResult[0] || {
      totalExams: 0,
      passCount: 0,
      failCount: 0,
      absentCount: 0,
      averagePercentage: 0,
    };

    // -----------------------------
    // PASS PERCENTAGE
    // -----------------------------
    const passPercentage =
      summary.totalExams > 0
        ? (
            (summary.passCount /
              summary.totalExams) *
            100
          ).toFixed(2)
        : 0;

    // -----------------------------
    // RESPONSE
    // -----------------------------
    res.status(200).json({
      success: true,

      data: exams,

      pagination: {
        currentPage,
        totalPages,
        totalExams,
        perPage,
        hasNextPage:
          currentPage < totalPages,
        hasPreviousPage:
          currentPage > 1,
      },

      summary: {
        totalExams: summary.totalExams,
        passCount: summary.passCount,
        failCount: summary.failCount,
        absentCount: summary.absentCount,
        averagePercentage:
          Number(
            Number(
              summary.averagePercentage || 0
            ).toFixed(2)
          ),
        passPercentage:
          Number(passPercentage),
      },
    });
  } catch (error) {
    console.error(
      "Get Exams Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch exams",
      error: error.message,
    });
  }
};
// GET single exam
export const getExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate(
      "studentId",
      "studentId firstName lastName email course department"
    );

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch exam",
      error: error.message,
    });
  }
};

// CREATE exam
export const createExam = async (req, res) => {
  try {
    const {
      studentId,
      examName,
      subject,
      academicYear,
      semester,
      examDate,
      marksObtained,
      totalMarks,
      remarks,
    } = req.body;

    if (
      marksObtained === undefined ||
      totalMarks === undefined
    ) {
      return res.status(400).json({
        message: "Marks obtained and total marks are required",
      });
    }

    if (Number(marksObtained) > Number(totalMarks)) {
      return res.status(400).json({
        message: "Marks obtained cannot be greater than total marks",
      });
    }

    const result = calculateResult(
      Number(marksObtained),
      Number(totalMarks)
    );

    const exam = await Exam.create({
      studentId,
      examName,
      subject,
      academicYear,
      semester,
      examDate,
      marksObtained,
      totalMarks,
      percentage: result.percentage,
      grade: result.grade,
      resultStatus: result.resultStatus,
      remarks,
    });

    const populatedExam = await Exam.findById(exam._id).populate(
      "studentId",
      "studentId firstName lastName email course department"
    );

    res.status(201).json(populatedExam);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create exam",
      error: error.message,
    });
  }
};

// UPDATE exam
export const updateExam = async (req, res) => {
  try {
    const {
      studentId,
      examName,
      subject,
      academicYear,
      semester,
      examDate,
      marksObtained,
      totalMarks,
      remarks,
    } = req.body;

    if (
      marksObtained === undefined ||
      totalMarks === undefined
    ) {
      return res.status(400).json({
        message: "Marks obtained and total marks are required",
      });
    }

    if (Number(marksObtained) > Number(totalMarks)) {
      return res.status(400).json({
        message: "Marks obtained cannot be greater than total marks",
      });
    }

    const result = calculateResult(
      Number(marksObtained),
      Number(totalMarks)
    );

    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      {
        studentId,
        examName,
        subject,
        academicYear,
        semester,
        examDate,
        marksObtained,
        totalMarks,
        percentage: result.percentage,
        grade: result.grade,
        resultStatus: result.resultStatus,
        remarks,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "studentId",
      "studentId firstName lastName email course department"
    );

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update exam",
      error: error.message,
    });
  }
};

// DELETE exam
export const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    res.status(200).json({
      message: "Exam deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete exam",
      error: error.message,
    });
  }
};

// GET exams by student
export const getStudentExams = async (req, res) => {
  try {
    const exams = await Exam.find({
      studentId: req.params.studentId,
    })
      .populate(
        "studentId",
        "studentId firstName lastName email course department"
      )
      .sort({ examDate: -1 });

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student exams",
      error: error.message,
    });
  }
};