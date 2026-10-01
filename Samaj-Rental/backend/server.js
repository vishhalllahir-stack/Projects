import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./confing/db.js";

import authRoutes from "./routes/authRoute.js";
import itemRoutes from "./routes/ItemRoutes.js";
import bookingRoutes from "./routes/bookingRoute.js";
import billRoutes from "./routes/billRoute.js";
import adminRoutes from "./routes/adminRoute.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";


/* =====================================================
   LOAD ENVIRONMENT VARIABLES
===================================================== */

dotenv.config();


/* =====================================================
   CREATE EXPRESS APP
===================================================== */

const app = express();


/* =====================================================
   DATABASE CONNECTION
===================================================== */

connectDB();


/* =====================================================
   GLOBAL MIDDLEWARE
===================================================== */

app.use(
  cors()
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);


/* =====================================================
   HOME / HEALTH CHECK
===================================================== */

app.get(
  "/",
  (req, res) => {
    res.status(200).json({
      success: true,
      message:
        "Samaj Rental API is Running",
    });
  }
);


/* =====================================================
   API ROUTES
===================================================== */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/items",
  itemRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/bills",
  billRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);


/* =====================================================
   404 NOT FOUND
===================================================== */

app.use(
  notFound
);


/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */

app.use(
  errorHandler
);


/* =====================================================
   SERVER
===================================================== */

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on port ${PORT}`
    );
  }
);