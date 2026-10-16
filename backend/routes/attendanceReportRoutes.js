import express from "express";
import { getAttendanceReport } from "../controller/attendanceReportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", validatePagination, getAttendanceReport);

export default router;
