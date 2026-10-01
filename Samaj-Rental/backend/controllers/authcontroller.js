import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


/* =====================================================
   REGISTER USER
===================================================== */

export const registerUser = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      village,
    } = req.body;


    /* ================================================
       REQUIRED FIELDS
    ================================================= */

    if (
      !name ||
      !email ||
      !mobile ||
      !password ||
      !village
    ) {
      return res.status(400).json({
        message:
          "Please fill all required fields",
      });
    }


    /* ================================================
       CLEAN DATA
    ================================================= */

    const cleanName =
      String(name).trim();

    const cleanEmail =
      String(email)
        .trim()
        .toLowerCase();

    const cleanMobile =
      String(mobile).trim();

    const cleanVillage =
      String(village).trim();


    /* ================================================
       NAME VALIDATION
    ================================================= */

    if (
      cleanName.length < 2
    ) {
      return res.status(400).json({
        message:
          "Name must contain at least 2 characters",
      });
    }


    if (
      cleanName.length > 100
    ) {
      return res.status(400).json({
        message:
          "Name cannot exceed 100 characters",
      });
    }


    /* ================================================
       EMAIL VALIDATION
    ================================================= */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        cleanEmail
      )
    ) {
      return res.status(400).json({
        message:
          "Please enter a valid email address",
      });
    }


    /* ================================================
       MOBILE VALIDATION
    ================================================= */

    const mobileRegex =
      /^[0-9]{10}$/;

    if (
      !mobileRegex.test(
        cleanMobile
      )
    ) {
      return res.status(400).json({
        message:
          "Mobile number must be exactly 10 digits",
      });
    }


    /* ================================================
       PASSWORD VALIDATION
    ================================================= */

    if (
      password.length < 6
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }


    if (
      password.length > 100
    ) {
      return res.status(400).json({
        message:
          "Password cannot exceed 100 characters",
      });
    }


    /* ================================================
       VILLAGE VALIDATION
    ================================================= */

    if (
      cleanVillage.length < 2
    ) {
      return res.status(400).json({
        message:
          "Village name is invalid",
      });
    }


    if (
      cleanVillage.length > 100
    ) {
      return res.status(400).json({
        message:
          "Village name cannot exceed 100 characters",
      });
    }


    /* ================================================
       CHECK EXISTING USER
    ================================================= */

    const existingUser =
      await User.findOne({
        email: cleanEmail,
      });

    if (existingUser) {
      return res.status(409).json({
        message:
          "Email already registered",
      });
    }


    /* ================================================
       HASH PASSWORD
    ================================================= */

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


    /* ================================================
       CREATE USER
    ================================================= */

    const user =
      await User.create({
        name: cleanName,

        email: cleanEmail,

        mobile: cleanMobile,

        password:
          hashedPassword,

        village:
          cleanVillage,

        role: "user",
      });


    /* ================================================
       RESPONSE
    ================================================= */

    res.status(201).json({
      message:
        "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        village: user.village,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Register Error:",
      error
    );

    /* ==============================================
       DUPLICATE EMAIL SAFETY
    ============================================== */

    if (
      error.code === 11000
    ) {
      return res.status(409).json({
        message:
          "Email already registered",
      });
    }

    res.status(500).json({
      message:
        "Registration failed",
    });
  }
};


/* =====================================================
   LOGIN USER
===================================================== */

export const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;


    /* ================================================
       REQUIRED FIELDS
    ================================================= */

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }


    /* ================================================
       CLEAN EMAIL
    ================================================= */

    const cleanEmail =
      String(email)
        .trim()
        .toLowerCase();


    /* ================================================
       EMAIL VALIDATION
    ================================================= */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        cleanEmail
      )
    ) {
      return res.status(400).json({
        message:
          "Please enter a valid email address",
      });
    }


    /* ================================================
       FIND USER
    ================================================= */

    const user =
      await User.findOne({
        email: cleanEmail,
      });


    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }


    /* ================================================
       COMPARE PASSWORD
    ================================================= */

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );


    if (
      !isPasswordCorrect
    ) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }


    /* ================================================
       JWT SECRET CHECK
    ================================================= */

    if (
      !process.env.JWT_SECRET
    ) {
      console.error(
        "JWT_SECRET is missing"
      );

      return res.status(500).json({
        message:
          "JWT secret is not configured",
      });
    }


    /* ================================================
       GENERATE JWT TOKEN
    ================================================= */

    const token =
      jwt.sign(
        {
          id: user._id,
          role: user.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1d",
        }
      );


    /* ================================================
       LOGIN RESPONSE
    ================================================= */

    res.status(200).json({
      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        village: user.village,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Login Error:",
      error
    );

    res.status(500).json({
      message:
        "Login failed",
    });
  }
};