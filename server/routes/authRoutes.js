import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { register, login, requestPasswordReset, resetPassword } from '../controllers/authController.js';
const router = Router();
const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, message: 'Too many password reset attempts. Please try again later.' }
});
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', passwordResetLimiter, requestPasswordReset);
router.post('/reset-password', passwordResetLimiter, resetPassword);
export default router;
