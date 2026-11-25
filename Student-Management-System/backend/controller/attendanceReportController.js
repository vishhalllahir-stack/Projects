import Attendance from "../models/attendence.js";

export const getAttendanceReport = async (req, res) => {
  try {
    const {
      studentId = "",
      subject = "",
      semester = "",
      startDate = "",
      endDate = "",
    } = req.query;

    const match = {};

    // Student filter
    if (studentId) {
      match.studentId = studentId;
    }

    // Subject filter
    if (subject.trim()) {
      match.subject = {
        $regex: subject.trim(),
        $options: "i",
      };
    }

    // Semester filter
    if (semester) {
      match.semester = Number(semester);
    }

    // Date filter
    if (startDate || endDate) {
      match.date = {};

      if (startDate) {
        match.date.$gte = new Date(
          `${startDate}T00:00:00`
        );
      }

      if (endDate) {
        match.date.$lte = new Date(
          `${endDate}T23:59:59`
        );
      }
    }

    const report = await Attendance.aggregate([
      {
        $match: match,
      },

      {
        $group: {
          _id: "$studentId",

          totalClasses: {
            $sum: 1,
          },

          present: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Present"],
                },
                1,
                0,
              ],
            },
          },

          absent: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Absent"],
                },
                1,
                0,
              ],
            },
          },

          late: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Late"],
                },
                1,
                0,
              ],
            },
          },

          leave: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "Leave"],
                },
                1,
                0,
              ],
            },
          },
        },
      },

      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "_id",
          as: "student",
        },
      },

      {
        $unwind: "$student",
      },

      {
        $project: {
          _id: 0,

          studentId: "$student._id",

          studentCode:
            "$student.studentId",

          studentName: {
            $concat: [
              "$student.firstName",
              " ",
              "$student.lastName",
            ],
          },

          course: "$student.course",

          department:
            "$student.department",

          semester:
            "$student.semester",

          totalClasses: 1,
          present: 1,
          absent: 1,
          late: 1,
          leave: 1,

          attendancePercentage: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: [
                      "$present",
                      "$totalClasses",
                    ],
                  },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },

      {
        $sort: {
          attendancePercentage: -1,
        },
      },
    ]);

    // Add attendance status
    const finalReport = report.map((student) => {
      let attendanceStatus = "Critical";

      if (student.attendancePercentage >= 75) {
        attendanceStatus = "Good";
      } else if (
        student.attendancePercentage >= 60
      ) {
        attendanceStatus = "Warning";
      }

      return {
        ...student,
        attendanceStatus,
      };
    });

    res.status(200).json({
      success: true,
      totalStudents: finalReport.length,
      data: finalReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate attendance report",
      error: error.message,
    });
  }
};