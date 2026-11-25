import express from "express";

import {
  getFees,
  getFee,
  createFee,
  updateFee,
  deleteFee,
  getStudentFees,
} from "../controller/feeController.js";

import { protect } from "../middleware/authMiddleware.js";
import { validateObjectId, validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();
router.use(protect);

router.get("/", validatePagination, getFees);

router.get(
  "/student/:studentId",
  getStudentFees
);

router.get("/:id", validateObjectId(), getFee);

router.post("/", createFee);

router.put("/:id", validateObjectId(), updateFee);

router.delete("/:id", validateObjectId(), deleteFee);

export default router;