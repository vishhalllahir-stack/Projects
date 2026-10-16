import express from "express";
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateObjectId, validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", validatePagination, getCourses);
router.get("/:id", validateObjectId(), getCourse);
router.post("/", createCourse);
router.put("/:id", validateObjectId(), updateCourse);
router.delete("/:id", validateObjectId(), deleteCourse);

export default router;