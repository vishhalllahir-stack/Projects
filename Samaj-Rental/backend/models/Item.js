import mongoose from "mongoose";

/* =====================================================
   ITEM SCHEMA
===================================================== */

const itemSchema = new mongoose.Schema(
  {
    /* ================================================
       ITEM NAME
    ================================================= */

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },


    /* ================================================
       CATEGORY
    ================================================= */

    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },


    /* ================================================
       DESCRIPTION
    ================================================= */

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },


    /* ================================================
       RENTAL PRICE PER DAY
    ================================================= */

    pricePerDay: {
      type: Number,
      required: true,
      min: 0,
    },


    /* ================================================
       TOTAL STOCK
    ================================================= */

    totalQuantity: {
      type: Number,
      required: true,
      min: 1,

      validate: {
        validator: Number.isInteger,

        message:
          "Total quantity must be a whole number",
      },
    },


    /* ================================================
       CURRENT AVAILABLE QUANTITY
    ================================================= */

    availableQuantity: {
      type: Number,
      required: true,
      min: 0,

      validate: {
        validator: Number.isInteger,

        message:
          "Available quantity must be a whole number",
      },
    },


    /* ================================================
       IMAGE URL
    ================================================= */

    image: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },


    /* ================================================
       ITEM AVAILABLE / UNAVAILABLE
    ================================================= */

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);


/* =====================================================
   MODEL
===================================================== */

const Item = mongoose.model(
  "Item",
  itemSchema
);

export default Item;