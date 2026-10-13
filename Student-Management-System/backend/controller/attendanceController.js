import Attendance from "../models/attendence.js";

export const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate(
      "studentId",
      "studentId firstName lastName email course department"
    );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    return res.status(200).json(attendance);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const {
      studentId = "",
      subject = "",
      status = "",
      startDate = "",
      endDate = "",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * perPage;

    const query = {};

    // Student filter
    if (studentId) {
      query.studentId = studentId;
    }

    // Subject filter
    if (subject.trim()) {
      query.subject = new RegExp(
        subject.trim(),
        "i"
      );
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Date filter
    if (startDate || endDate) {
      query.date = {};

      if (startDate) {
        query.date.$gte = new Date(
          `${startDate}T00:00:00`
        );
      }

      if (endDate) {
        query.date.$lte = new Date(
          `${endDate}T23:59:59`
        );
      }
    }

    const totalAttendance =
      await Attendance.countDocuments(query);

    const attendance = await Attendance.find(query)
      .populate(
        "studentId",
        "studentId firstName lastName email course department"
      )
      .sort({ date: -1 })
      .skip(skip)
      .limit(perPage);

    const totalPages = Math.ceil(
      totalAttendance / perPage
    );

    res.status(200).json({
      success: true,
      data: attendance,
      pagination: {
        currentPage,
        totalPages,
        totalAttendance,
        perPage,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};


// Create attendance
export const createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);

    const populatedAttendance =
      await Attendance.findById(attendance._id).populate(
        "studentId",
        "studentId firstName lastName email"
      );

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance: populatedAttendance,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to mark attendance",
      error: error.message,
    });
  }
};

// Update attendance
export const updateAttendance = async (req, res) => {
  try {
    const attendance =
      await Attendance.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "studentId",
        "studentId firstName lastName email"
      );

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      message: "Attendance updated successfully",
      attendance,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update attendance",
      error: error.message,
    });
  }
};

// Delete attendance
export const deleteAttendance = async (req, res) => {
  try {
    const attendance =
      await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete attendance",
      error: error.message,
    });
  }
};

// Get attendance by student
export const getStudentAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      studentId: req.params.studentId,
    })
      .populate(
        "studentId",
        "studentId firstName lastName email"
      )
      .sort({ date: -1 });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student attendance",
      error: error.message,
    });
  }
};