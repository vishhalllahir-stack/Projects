import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import authMiddleware from "../middleware/authMiddleware.js";
import { generateToolResult } from "../controllers/toolsController.js";

const router = Router();
const toolRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many AI tool requests. Please try again later.",
  },
});

router.use(authMiddleware);
router.post("/:toolId", toolRateLimit, generateToolResult);

export default router;
