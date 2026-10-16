import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Course from "../models/course.js";
import Department from "../models/department.js";
import Attendance from "../models/attendence.js";
import Fee from "../models/Fee.js";
import Exam from "../models/Exam.js";

export const getFeeReport = async (req, res) => {
  try {
    const {
      search = "",
      academicYear = "",
      semester = "",
      status = "",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * perPage;

    const query = {};

    if (academicYear.trim()) {
      query.academicYear = academicYear.trim();
    }

    if (semester) {
      query.semester = Number(semester);
    }

    if (status) {
      query.status = status;
    }

    if (search.trim()) {
      const Student = (await import("../models/student.js")).default;

      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const searchRegex = new RegExp(
        escapedSearch,
        "i"
      );

      const students = await Student.find({
        $or: [
          { studentId: searchRegex },
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex },
          { phone: searchRegex },
        ],
      }).select("_id");

      const studentIds = students.map(
        (student) => student._id
      );

      query.$or = [
        { studentId: { $in: studentIds } },
        { academicYear: searchRegex },
      ];
    }

    const totalFees =
      await Fee.countDocuments(query);

    const fees = await Fee.find(query)
      .populate(
        "studentId",
        "studentId firstName lastName email phone course department semester"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(perPage);

    const summaryResult = await Fee.aggregate([
      {
        $match: query,
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
              $max: [
                {
                  $subtract: [
                    "$totalFees",
                    "$paidAmount",
                  ],
                },
                0,
              ],
            },
          },
        },
      },
    ]);

    const summary = summaryResult[0] || {
      totalFees: 0,
      paidAmount: 0,
      pendingAmount: 0,
    };

    const totalPages = Math.ceil(
      totalFees / perPage
    );

    res.status(200).json({
      success: true,
      data: fees,
      summary: {
        totalFees: summary.totalFees || 0,
        paidAmount: summary.paidAmount || 0,
        pendingAmount:
          summary.pendingAmount || 0,
        totalRecords: totalFees,
      },
      pagination: {
        currentPage,
        totalPages,
        totalFees,
        perPage,
        hasNextPage:
          currentPage < totalPages,
        hasPreviousPage:
          currentPage > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate fee report",
      error: error.message,
    });
  }
};





export const getExamReport = async (req, res) => {
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

    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * perPage;

    const query = {};

    if (academicYear.trim()) {
      query.academicYear = academicYear.trim();
    }

    if (semester) {
      query.semester = Number(semester);
    }

    if (subject.trim()) {
      query.subject = subject.trim();
    }

    if (grade) {
      query.grade = grade;
    }

    if (resultStatus) {
      query.resultStatus = resultStatus;
    }

    if (search.trim()) {
      const Student = (
        await import("../models/student.js")
      ).default;

      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const searchRegex = new RegExp(
        escapedSearch,
        "i"
      );

      const students = await Student.find({
        $or: [
          { studentId: searchRegex },
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex },
          { phone: searchRegex },
        ],
      }).select("_id");

      const studentIds = students.map(
        (student) => student._id
      );

      query.$or = [
        { studentId: { $in: studentIds } },
        { examName: searchRegex },
        { subject: searchRegex },
        { academicYear: searchRegex },
      ];
    }

    const totalExams =
      await Exam.countDocuments(query);

    const exams = await Exam.find(query)
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

    const summaryResult = await Exam.aggregate([
      {
        $match: query,
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

    const passPercentage =
      summary.totalExams > 0
        ? (summary.passCount /
            summary.totalExams) *
          100
        : 0;

    const totalPages = Math.ceil(
      totalExams / perPage
    );

    res.status(200).json({
      success: true,

      data: exams,

      summary: {
        totalExams:
          summary.totalExams || 0,

        passCount:
          summary.passCount || 0,

        failCount:
          summary.failCount || 0,

        absentCount:
          summary.absentCount || 0,

        averagePercentage: Number(
          summary.averagePercentage || 0
        ).toFixed(2),

        passPercentage: Number(
          passPercentage
        ).toFixed(2),
      },

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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Failed to generate exam report",
      error: error.message,
    });
  }
};



export const getTeacherReport = async (req, res) => {
  try {
    const {
      search = "",
      department = "",
      subject = "",
      status = "",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * perPage;

    const query = {};

    if (search.trim()) {
      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const searchRegex = new RegExp(
        escapedSearch,
        "i"
      );

      query.$or = [
        { teacherId: searchRegex },
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { qualification: searchRegex },
        { department: searchRegex },
        { subject: searchRegex },
      ];
    }

    if (department.trim()) {
      query.department = department.trim();
    }

    if (subject.trim()) {
      query.subject = subject.trim();
    }

    if (status) {
      query.status = status;
    }

    const totalTeachers =
      await Teacher.countDocuments(query);

    const teachers = await Teacher.find(query)
      .select(
        "teacherId firstName lastName email phone qualification experience department subject joiningDate salary status"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(perPage);

    const totalPages = Math.ceil(
      totalTeachers / perPage
    );

    res.status(200).json({
      success: true,
      data: teachers,
      pagination: {
        currentPage,
        totalPages,
        totalTeachers,
        perPage,
        hasNextPage:
          currentPage < totalPages,
        hasPreviousPage:
          currentPage > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate teacher report",
      error: error.message,
    });
  }
};






export const getStudentReport = async (req, res) => {
  try {
    const {
      search = "",
      course = "",
      department = "",
      status = "",
      semester = "",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * perPage;

    const query = {};

    // Search
    if (search.trim()) {
      const escapedSearch = search
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      const searchRegex = new RegExp(
        escapedSearch,
        "i"
      );

      query.$or = [
        { studentId: searchRegex },
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { course: searchRegex },
        { department: searchRegex },
      ];
    }

    // Course filter
    if (course.trim()) {
      query.course = course.trim();
    }

    // Department filter
    if (department.trim()) {
      query.department = department.trim();
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Semester filter
    if (semester) {
      query.semester = Number(semester);
    }

    const totalStudents =
      await Student.countDocuments(query);

    const students = await Student.find(query)
      .select(
        "studentId firstName lastName email phone gender dateOfBirth course department semester admissionDate status"
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(perPage);

    const totalPages = Math.ceil(
      totalStudents / perPage
    );

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        currentPage,
        totalPages,
        totalStudents,
        perPage,
        hasNextPage:
          currentPage < totalPages,
        hasPreviousPage:
          currentPage > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate student report",
      error: error.message,
    });
  }
};





export const getReportSummary = async (req, res) => {
  try {
    const [
      totalStudents,
      activeStudents,
      inactiveStudents,
      graduatedStudents,

      totalTeachers,
      activeTeachers,
      inactiveTeachers,

      totalCourses,
      activeCourses,
      inactiveCourses,

      totalDepartments,
      activeDepartments,
      inactiveDepartments,

      totalAttendance,
      presentAttendance,
      absentAttendance,
      lateAttendance,
      leaveAttendance,

      feeSummary,

      totalExams,
      passExams,
      failExams,
      absentExams,
      examAverage,
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: "Active" }),
      Student.countDocuments({ status: "Inactive" }),
      Student.countDocuments({ status: "Graduated" }),

      Teacher.countDocuments(),
      Teacher.countDocuments({ status: "Active" }),
      Teacher.countDocuments({ status: "Inactive" }),

      Course.countDocuments(),
      Course.countDocuments({ status: "Active" }),
      Course.countDocuments({ status: "Inactive" }),

      Department.countDocuments(),
      Department.countDocuments({ status: "Active" }),
      Department.countDocuments({ status: "Inactive" }),

      Attendance.countDocuments(),
      Attendance.countDocuments({ status: "Present" }),
      Attendance.countDocuments({ status: "Absent" }),
      Attendance.countDocuments({ status: "Late" }),
      Attendance.countDocuments({ status: "Leave" }),

      Fee.aggregate([
        {
          $group: {
            _id: null,
            totalFees: {
              $sum: "$totalFees",
            },
            paidAmount: {
              $sum: "$paidAmount",
            },
          },
        },
      ]),

      Exam.countDocuments(),
      Exam.countDocuments({
        resultStatus: "Pass",
      }),
      Exam.countDocuments({
        resultStatus: "Fail",
      }),
      Exam.countDocuments({
        resultStatus: "Absent",
      }),

      Exam.aggregate([
        {
          $group: {
            _id: null,
            averagePercentage: {
              $avg: "$percentage",
            },
          },
        },
      ]),
    ]);

    const totalFees =
      feeSummary.length > 0
        ? feeSummary[0].totalFees
        : 0;

    const paidFees =
      feeSummary.length > 0
        ? feeSummary[0].paidAmount
        : 0;

    const pendingFees =
      Math.max(totalFees - paidFees, 0);

    const attendancePercentage =
      totalAttendance > 0
        ? Number(
            (
              (presentAttendance /
                totalAttendance) *
              100
            ).toFixed(2)
          )
        : 0;

    const examAveragePercentage =
      examAverage.length > 0
        ? Number(
            (
              examAverage[0]
                .averagePercentage || 0
            ).toFixed(2)
          )
        : 0;

    const examPassPercentage =
      totalExams > 0
        ? Number(
            (
              (passExams / totalExams) *
              100
            ).toFixed(2)
          )
        : 0;

    res.status(200).json({
      students: {
        total: totalStudents,
        active: activeStudents,
        inactive: inactiveStudents,
        graduated: graduatedStudents,
      },

      teachers: {
        total: totalTeachers,
        active: activeTeachers,
        inactive: inactiveTeachers,
      },

      courses: {
        total: totalCourses,
        active: activeCourses,
        inactive: inactiveCourses,
      },

      departments: {
        total: totalDepartments,
        active: activeDepartments,
        inactive: inactiveDepartments,
      },

      attendance: {
        total: totalAttendance,
        present: presentAttendance,
        absent: absentAttendance,
        late: lateAttendance,
        leave: leaveAttendance,
        percentage: attendancePercentage,
      },

      fees: {
        total: totalFees,
        paid: paidFees,
        pending: pendingFees,
      },

      exams: {
        total: totalExams,
        pass: passExams,
        fail: failExams,
        absent: absentExams,
        averagePercentage:
          examAveragePercentage,
        passPercentage:
          examPassPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate report summary",
      error: error.message,
    });
  }
};