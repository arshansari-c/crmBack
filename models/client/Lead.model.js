import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    Status: {
      type: String,
      required: true,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Working",
        "Proposal Sent",
        "Customer",
      ],
      default: "New",
    },
    Source: {
      type: String,
      required: true,
      enum: ["Facebook", "Google", "LinkedIn", "Referral", "Other"],
      default: "Other",
    },
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Address: {
      type: String,
      required: true,
      trim: true,
    },
    Position: {
      type: String,
      trim: true,
    },
    City: {
      type: String,
      trim: true,
    },
    Email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    State: {
      type: String,
      trim: true,
    },
    Website: {
      type: String,
      trim: true,
    },
    Phone: {
      type: String, // changed to string to store country codes like +91
      trim: true,
    },
    Zipcode: {
      type: String,
      trim: true,
    },
    LeadValue: {
      type: Number,
      default: 0,
    },
    Company: {
      type: String,
      trim: true,
    },
    Description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const LeadModel = mongoose.model("Lead", LeadSchema);
