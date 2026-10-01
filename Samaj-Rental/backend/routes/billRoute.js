import express from "express";

import {
  getMyBills,
  getBillById,
  downloadBillPDF,
} from "../controllers/BillControllers.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();


/* =====================================================
   GET MY BILLS
   GET /api/bills/my
===================================================== */

router.get(
  "/my",
  authMiddleware,
  getMyBills
);


/* =====================================================
   DOWNLOAD BILL PDF
   GET /api/bills/:id/pdf
===================================================== */

router.get(
  "/:id/pdf",
  authMiddleware,
  downloadBillPDF
);


/* =====================================================
   GET SINGLE BILL
   GET /api/bills/:id
===================================================== */

router.get(
  "/:id",
  authMiddleware,
  getBillById
);


export default router;