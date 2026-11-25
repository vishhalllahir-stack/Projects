import express from "express";
import {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controller/departmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateObjectId, validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", validatePagination, getDepartments);
router.get("/:id", validateObjectId(), getDepartment);
router.post("/", createDepartment);
router.put("/:id", validateObjectId(), updateDepartment);
router.delete("/:id", validateObjectId(), deleteDepartment);

export default router;