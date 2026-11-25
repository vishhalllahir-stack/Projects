import express from "express";

import {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getStudentAttendance,
} from "../controller/attendanceController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateObjectId, validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", validatePagination, getAttendance);

router.get(
  "/student/:studentId",
  getStudentAttendance
);

router.get("/:id", validateObjectId(), getAttendanceById);

router.post("/", createAttendance);

router.put("/:id", validateObjectId(), updateAttendance);

router.delete("/:id", validateObjectId(), deleteAttendance);

export default router;