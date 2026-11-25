import express from "express";
import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controller/studentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateObjectId, validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", validatePagination, getStudents);
router.get("/:id", validateObjectId(), getStudent);
router.post("/", createStudent);
router.put("/:id", validateObjectId(), updateStudent);
router.delete("/:id", validateObjectId(), deleteStudent);

export default router;