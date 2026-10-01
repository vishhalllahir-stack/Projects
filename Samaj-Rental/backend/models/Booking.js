import mongoose from "mongoose";

/* =====================================================
   BOOKING ITEM SCHEMA
===================================================== */

const bookingItemSchema =
  new mongoose.Schema(
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      pricePerDay: {
        type: Number,
        required: true,
        min: 0,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    {
      _id: false,
    }
  );


/* =====================================================
   BOOKING SCHEMA
===================================================== */

const bookingSchema =
  new mongoose.Schema(
    {
      /* ================================================
         USER
      ================================================= */

      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },


      /* ================================================
         CUSTOMER DETAILS
      ================================================= */

      customerName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
      },

      mobile: {
        type: String,
        required: true,
        trim: true,
      },

      village: {
        type: String,
        required: true,
        trim: true,
      },


      /* ================================================
         BOOKING DATES
      ================================================= */

      bookingDate: {
        type: Date,
        required: true,
      },

      returnDate: {
        type: Date,
        required: true,
      },


      /* ================================================
         BOOKING ITEMS
      ================================================= */

      items: {
        type: [bookingItemSchema],
        required: true,
        validate: {
          validator: function (value) {
            return (
              Array.isArray(value) &&
              value.length > 0
            );
          },

          message:
            "Booking must contain at least one item",
        },
      },


      /* ================================================
         TOTAL AMOUNT
      ================================================= */

      totalAmount: {
        type: Number,
        required: true,
        min: 0,
      },


      /* ================================================
         CUSTOMER NOTES
      ================================================= */

      notes: {
        type: String,
        trim: true,
        maxlength: 500,
        default: "",
      },


      /* ================================================
         BOOKING STATUS
      ================================================= */

      status: {
        type: String,

        enum: [
          "pending",
          "confirmed",
          "completed",
          "cancelled",
        ],

        default: "pending",
      },
    },

    {
      timestamps: true,
    }
  );


/* =====================================================
   BOOKING MODEL
===================================================== */

const Booking =
  mongoose.model(
    "Booking",
    bookingSchema
  );

export default Booking;