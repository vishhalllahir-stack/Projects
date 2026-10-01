import mongoose from "mongoose";

/* =====================================================
   BILL ITEM SCHEMA
===================================================== */

const billItemSchema =
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
   BILL SCHEMA
===================================================== */

const billSchema =
  new mongoose.Schema(
    {
      /* ================================================
         BOOKING
      ================================================= */

      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
        unique: true,
      },


      /* ================================================
         USER
      ================================================= */

      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },


      /* ================================================
         BILL NUMBER
      ================================================= */

      billNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },


      /* ================================================
         CUSTOMER DETAILS
      ================================================= */

      customerName: {
        type: String,
        required: true,
        trim: true,
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
         BILL ITEMS
      ================================================= */

      items: {
        type: [billItemSchema],
        required: true,

        validate: {
          validator: function (value) {
            return (
              Array.isArray(value) &&
              value.length > 0
            );
          },

          message:
            "Bill must contain at least one item",
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
         NOTES
      ================================================= */

      notes: {
        type: String,
        trim: true,
        maxlength: 500,
        default: "",
      },


      /* ================================================
         BILL GENERATED DATE
      ================================================= */

      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },

    {
      timestamps: true,
    }
  );


/* =====================================================
   BILL MODEL
===================================================== */

const Bill =
  mongoose.model(
    "Bill",
    billSchema
  );

export default Bill;