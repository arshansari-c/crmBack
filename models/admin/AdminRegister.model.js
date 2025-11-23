import mongoose from "mongoose";

const AdminRegisterSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    oldPasswords: [
      {
        password: { type: String },
        changedAt: { type: Date, default: Date.now },
      },
    ],
    ipAddress: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    loginHistory: [
      {
        loginAt: { type: Date, default: Date.now },
        ipAddress: String,
        userAgent: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String, // Could store another admin ID or "system"
      default: "system",
    },
    updatedBy: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    versionKey: false, // Removes __v
  }
);

// Indexes for performance
AdminRegisterSchema.index({ email: 1 });
AdminRegisterSchema.index({ username: 1 });

export const AdminRegisterModel = mongoose.model(
  "AdminRegister",
  AdminRegisterSchema
);
