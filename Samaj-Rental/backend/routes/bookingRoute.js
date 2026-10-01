import express from "express";

import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/BookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* =====================================================
   USER ROUTES
===================================================== */

// Create Booking
router.post(
  "/",
  authMiddleware,
  createBooking
);

// Get Logged-in User Bookings
router.get(
  "/my",
  authMiddleware,
  getMyBookings
);


/* =====================================================
   ADMIN ROUTES
===================================================== */

// Get All Bookings
router.get(
  "/admin/all",
  authMiddleware,
  adminMiddleware,
  getAllBookings
);

// Update Booking Status
router.put(
  "/admin/:id/status",
  authMiddleware,
  adminMiddleware,
  updateBookingStatus
);


export default router;