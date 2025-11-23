import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyAdminAuth = (req, res, next) => {
  try {
    // Extract token from cookie
    const token = req.cookies.admin_token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: "Invalid or expired token." });
      }

      // Attach admin data to request object
      req.admin = decoded;
      next();
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
