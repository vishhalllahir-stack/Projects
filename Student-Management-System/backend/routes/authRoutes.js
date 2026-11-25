import express from "express";

import {
  register,
  login,
  getMe,
} from "../controller/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import { rateLimit } from "../middleware/securityMiddleware.js";

const router = express.Router();

router.post("/register", rateLimit({ windowMs: 15 * 60 * 1000, max: 10 }), register);

router.post("/login", rateLimit({ windowMs: 15 * 60 * 1000, max: 15 }), login);

router.get("/me", protect, getMe);

export default router;