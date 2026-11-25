import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/adminController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";
import { validatePagination } from "../middleware/securityMiddleware.js";

const router = express.Router();

// All admin routes require login + admin role
router.use(protect);
router.use(authorize("admin"));

router.get("/users", validatePagination, getUsers);

router.get("/users/:id", getUser);

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;