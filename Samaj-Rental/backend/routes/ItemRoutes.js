import express from "express";

import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemAvailability,
} from "../controllers/itemcontrollers.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();


/* =====================================================
   PUBLIC / USER ROUTES
===================================================== */

// Get all items
router.get(
  "/",
  getItems
);


// Get date-wise item availability
// IMPORTANT: Keep this before /:id
router.get(
  "/:id/availability",
  authMiddleware,
  getItemAvailability
);


// Get single item
router.get(
  "/:id",
  getItemById
);


/* =====================================================
   ADMIN ROUTES
===================================================== */

// Create item
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createItem
);


// Update item
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateItem
);


// Delete item
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteItem
);


export default router;