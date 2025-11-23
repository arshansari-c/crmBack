import { AdminRegisterModel } from "../../models/admin/AdminRegister.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * @desc Register a new admin
 * @route POST /api/admin/register
 */
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, ipAddress } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if email already exists
    const existingAdmin = await AdminRegisterModel.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new AdminRegisterModel({
      username,
      email,
      password: hashedPassword,
      ipAddress: ipAddress || req.ip,
      loginHistory: [
        {
          loginAt: new Date(),
          ipAddress: ipAddress || req.ip,
          userAgent: req.headers["user-agent"],
        },
      ],
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const admin = await AdminRegisterModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.isSuperAdmin ? "superadmin" : "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Update login info
    admin.lastLogin = new Date();
    admin.ipAddress = req.ip;
    admin.loginHistory.push({
      loginAt: new Date(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });
    await admin.save();

    // Set cookie options
    const cookieOptions = {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production", // only https in prod
      sameSite: "Strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Send token in cookie
    res
      .cookie("admin_token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        data: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          lastLogin: admin.lastLogin,
        },
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


