import express from "express";
import {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../controller/teacherController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateObjectId, validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", validatePagination, getTeachers);
router.get("/:id", validateObjectId(), getTeacher);
router.post("/", createTeacher);
router.put("/:id", validateObjectId(), updateTeacher);
router.delete("/:id", validateObjectId(), deleteTeacher);

export default router;