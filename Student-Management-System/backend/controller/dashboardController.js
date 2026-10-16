import Student from "../models/student.js";
import Teacher from "../models/teacher.js";
import Course from "../models/course.js";
import Department from "../models/department.js";
import Attendance from "../models/attendence.js";
import Fee from "../models/Fee.js";
import Exam from "../models/Exam.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalTeachers,
      totalCourses,
      totalDepartments,
      totalAttendance,
      presentAttendance,
      feeData,
      recentStudents,
      recentExams,
    ] = await Promise.all([
      Student.countDocuments(),

      Teacher.countDocuments(),

      Course.countDocuments(),

      Department.countDocuments(),

      Attendance.countDocuments(),

      Attendance.countDocuments({
        status: "Present",
      }),

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

      Student.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "studentId firstName lastName email course department status"
        ),

      Exam.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate(
          "studentId",
          "studentId firstName lastName"
        ),
    ]);

    const totalFees =
      feeData.length > 0
        ? feeData[0].totalFees
        : 0;

    const paidFees =
      feeData.length > 0
        ? feeData[0].paidAmount
        : 0;

    const pendingFees =
      totalFees - paidFees;

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

    res.status(200).json({
      statistics: {
        totalStudents,
        totalTeachers,
        totalCourses,
        totalDepartments,
      },

      attendance: {
        total: totalAttendance,
        present: presentAttendance,
        percentage: attendancePercentage,
      },

      fees: {
        totalFees,
        paidFees,
        pendingFees,
      },

      recentStudents,

      recentExams,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard statistics",
      error: error.message,
    });
  }
};