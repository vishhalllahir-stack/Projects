import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authcontroller.js";

const router = express.Router();


/* =====================================================
   REGISTER
   POST /auth/register
===================================================== */

router.post(
  "/register",
  registerUser
);


/* =====================================================
   LOGIN
   POST /auth/login
===================================================== */

router.post(
  "/login",
  loginUser
);


/* =====================================================
   AUTH HEALTH CHECK
   GET /auth/health
===================================================== */

router.get(
  "/health",
  (req, res) => {
    res.status(200).json({
      message:
        "Auth route is working",
    });
  }
);


export default router;