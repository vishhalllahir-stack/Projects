import express from "express";

import {
  getExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
  getStudentExams,
} from "../controller/examController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateObjectId, validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", validatePagination, getExams);

router.get("/student/:studentId", getStudentExams);

router.get("/:id", validateObjectId(), getExam);

router.post("/", createExam);

router.put("/:id", validateObjectId(), updateExam);

router.delete("/:id", validateObjectId(), deleteExam);

export default router;