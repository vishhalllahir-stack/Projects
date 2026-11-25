import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import PasswordResetToken from "../models/PasswordResetToken.js";
import User from "../models/User.js";
import {
  isEmailConfigured,
  sendPasswordResetEmail,
} from "../services/emailService.js";

function makeToken(userId) {
  return jwt.sign({ userId: String(userId) }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}
function publicUser(user) {
  return { id: String(user._id), name: user.name, email: user.email };
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.userId).select("name email createdAt").lean();
    if (!user)
      return res.status(404).json({ success: false, message: "Account not found." });
    return res.json({
      success: true,
      user: { id: String(user._id), name: user.name, email: user.email, createdAt: user.createdAt },
    });
  } catch (error) {
    console.error("Get profile error:", error.message);
    return res.status(500).json({ success: false, message: "Could not load your account." });
  }
}

export async function updateProfile(req, res) {
  try {
    const body = req.body || {};
    if (
      !Object.keys(body).length ||
      Object.keys(body).some(
        (key) =>
          !["name", "email", "currentPassword", "newPassword"].includes(key),
      )
    )
      return res.status(400).json({
        success: false,
        message: "Provide supported account changes.",
      });

    const user = await User.findById(req.userId).select("+password");
    if (!user)
      return res.status(404).json({ success: false, message: "Account not found." });

    const updates = {};
    if (Object.hasOwn(body, "name")) {
      if (typeof body.name !== "string" || !body.name.trim())
        return res.status(400).json({
          success: false,
          message: "Name must contain at least one character.",
        });
      const name = body.name.trim();
      if (name.length > 80)
        return res.status(400).json({
          success: false,
          message: "Name must be 80 characters or fewer.",
        });
      updates.name = name;
    }
    if (Object.hasOwn(body, "email")) {
      if (
        typeof body.email !== "string" ||
        body.email.trim().length > 254 ||
        !/^\S+@\S+\.\S+$/.test(body.email.trim())
      )
        return res.status(400).json({
          success: false,
          message: "Enter a valid email address.",
        });
      updates.email = body.email.trim().toLowerCase();
    }

    const changesEmail = updates.email && updates.email !== user.email;
    const requestsPasswordChange =
      Object.hasOwn(body, "currentPassword") ||
      Object.hasOwn(body, "newPassword");
    if (changesEmail || requestsPasswordChange) {
      if (
        typeof body.currentPassword !== "string" ||
        body.currentPassword.length > 128 ||
        !(await bcrypt.compare(body.currentPassword, user.password))
      )
        return res.status(400).json({
          success: false,
          message: "Enter your current password to change your email or password.",
        });
    }
    if (requestsPasswordChange) {
      if (typeof body.newPassword !== "string" || body.newPassword.length < 8)
        return res.status(400).json({
          success: false,
          message: "New password must contain at least 8 characters.",
        });
      if (body.newPassword.length > 128)
        return res.status(400).json({
          success: false,
          message: "New password must be 128 characters or fewer.",
        });
      if (await bcrypt.compare(body.newPassword, user.password))
        return res.status(400).json({
          success: false,
          message: "Choose a new password that differs from your current password.",
        });
      updates.password = await bcrypt.hash(body.newPassword, 12);
    }
    if (changesEmail && (await User.exists({ email: updates.email, _id: { $ne: user._id } })))
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });

    Object.assign(user, updates);
    await user.save();
    return res.json({ success: true, user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    console.error("Update profile error:", error.message);
    return res.status(500).json({ success: false, message: "Could not update your account." });
  }
}

function isLocalPasswordResetEnabled(req) {
  const address = req.socket.remoteAddress || "";
  const isLoopback =
    address === "::1" ||
    /^127(?:\.\d{1,3}){3}$/.test(address) ||
    /^::ffff:127(?:\.\d{1,3}){3}$/.test(address);
  let isLocalClient = false;
  try {
    const clientHost = new URL(
      process.env.CLIENT_ORIGIN || "http://localhost:5173",
    ).hostname;
    isLocalClient =
      clientHost === "localhost" ||
      clientHost === "127.0.0.1" ||
      clientHost === "[::1]";
  } catch {
    return false;
  }
  return (
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_LOCAL_PASSWORD_RESET === "true" &&
    isLoopback &&
    isLocalClient
  );
}

export async function register(req, res) {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");
    if (!name || !email || !password)
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, email and password are required.",
        });
    if (!/^\S+@\S+\.\S+$/.test(email))
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email address." });
    if (password.length < 8)
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must contain at least 8 characters.",
        });
    if (await User.findOne({ email }))
      return res
        .status(409)
        .json({
          success: false,
          message: "An account with this email already exists.",
        });
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });
    return res
      .status(201)
      .json({
        success: true,
        token: makeToken(user._id),
        user: publicUser(user),
      });
  } catch (error) {
    console.error("Register error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Could not create account." });
  }
}

export async function login(req, res) {
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body.password || "");
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res
        .status(401)
        .json({ success: false, message: "Email or password is incorrect." });
    return res.json({
      success: true,
      token: makeToken(user._id),
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Could not log in right now." });
  }
}

export async function requestPasswordReset(req, res) {
  const emailConfigured = isEmailConfigured();
  const localResetEnabled =
    !emailConfigured && isLocalPasswordResetEnabled(req);
  if (!emailConfigured && !localResetEnabled) {
    return res.status(503).json({
      success: false,
      message:
        "Email recovery is not configured. Configure SMTP, or enable local password recovery for development in server/.env.",
    });
  }

  const message = localResetEnabled
    ? "Local reset link ready. It works only on this computer and expires in 15 minutes."
    : "If an account exists for that email, a password reset link will be sent.";
  let tokenHash;
  let userId;
  try {
    const email = String(req.body.email || "")
      .trim()
      .toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: true, message });

    userId = user._id;
    await PasswordResetToken.deleteMany({ userId: user._id });
    const token = randomBytes(32).toString("hex");
    tokenHash = createHash("sha256").update(token).digest("hex");
    await PasswordResetToken.create({
      userId: user._id,
      tokenHash,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
    const resetUrl = new URL("/", clientOrigin);
    resetUrl.searchParams.set("resetToken", token);
    if (localResetEnabled) {
      return res.json({
        success: true,
        message,
        resetUrl: resetUrl.toString(),
      });
    }

    await sendPasswordResetEmail(email, resetUrl.toString());
    return res.json({ success: true, message });
  } catch (error) {
    console.error("Password reset request error:", error.message);
    if (tokenHash && userId)
      await PasswordResetToken.deleteOne({ userId, tokenHash });
    return res
      .status(503)
      .json({
        success: false,
        message:
          "Could not send a password reset email. Check the server email settings and try again.",
      });
  }
}

export async function resetPassword(req, res) {
  try {
    const token = String(req.body.token || "");
    const password = String(req.body.password || "");
    if (!token || password.length < 8) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "The reset link is invalid or expired, or the password is too short.",
        });
    }

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const reset = await PasswordResetToken.findOneAndDelete({
      tokenHash,
      expiresAt: { $gt: new Date() },
    });
    if (!reset)
      return res
        .status(400)
        .json({
          success: false,
          message: "The reset link is invalid or expired. Request a new one.",
        });

    const user = await User.findByIdAndUpdate(reset.userId, {
      password: await bcrypt.hash(password, 12),
    });
    if (!user)
      return res
        .status(400)
        .json({
          success: false,
          message: "The reset link is invalid or expired. Request a new one.",
        });

    await PasswordResetToken.deleteMany({ userId: user._id });
    return res.json({
      success: true,
      message: "Password updated. You can now sign in.",
    });
  } catch (error) {
    console.error("Password reset error:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "Could not reset your password right now.",
      });
  }
}
