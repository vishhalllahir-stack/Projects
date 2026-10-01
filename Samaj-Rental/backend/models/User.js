import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* ================================================
       USER NAME
    ================================================= */

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },


    /* ================================================
       EMAIL
    ================================================= */

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
    },


    /* ================================================
       PASSWORD
       Password will be stored as bcrypt hash
    ================================================= */

    password: {
      type: String,
      required: true,
    },


    /* ================================================
       MOBILE
    ================================================= */

    mobile: {
      type: String,
      default: "",
      trim: true,
    },


    /* ================================================
       VILLAGE
    ================================================= */

    village: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },


    /* ================================================
       ROLE
    ================================================= */

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  {
    timestamps: true,
  }
);


/* =====================================================
   MODEL
===================================================== */

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;