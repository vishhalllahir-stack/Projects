import express from "express";
import {
  getReportSummary,
  getStudentReport,
  getTeacherReport,
  getFeeReport,
  getExamReport,
} from "../controller/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getReportSummary);
router.get("/students", protect, validatePagination, getStudentReport);
router.get("/teachers", protect, validatePagination, getTeacherReport);
router.get("/fees", protect, validatePagination, getFeeReport);
router.get("/exams", protect, validatePagination, getExamReport);

export default router;
