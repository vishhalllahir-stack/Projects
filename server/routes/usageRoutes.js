import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUsage } from "../controllers/usageController.js";

const router = Router();
router.use(authMiddleware);
router.get("/", getUsage);

export default router;
