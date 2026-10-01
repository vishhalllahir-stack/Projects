import express from "express";

import {
  getAdminStats,
  getAllUsers,
  getAllBills,
} from "../controllers/adminController.js";

import {
  downloadAdminBillPDF,
} from "../controllers/BillControllers.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";


const router = express.Router();


/* =====================================================
   ADMIN API STATUS

   GET /api/admin/
===================================================== */

router.get(
  "/",
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin API is running",
    });
  }
);


/* =====================================================
   ADMIN STATS

   GET /api/admin/stats
===================================================== */

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getAdminStats
);


/* =====================================================
   ALL USERS

   GET /api/admin/users
===================================================== */

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);


/* =====================================================
   ALL BILLS

   GET /api/admin/bills
===================================================== */

router.get(
  "/bills",
  authMiddleware,
  adminMiddleware,
  getAllBills
);


/* =====================================================
   ADMIN BILL PDF

   GET /api/admin/bills/:id/pdf
===================================================== */

router.get(
  "/bills/:id/pdf",
  authMiddleware,
  adminMiddleware,
  downloadAdminBillPDF
);


export default router;