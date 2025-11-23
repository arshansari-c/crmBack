import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema(
  {
    Subject: {
      type: String,
      required: true,
      trim: true,
    },
    Tags: {
      type: [String],
      default: [],
    },
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    Priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    Status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    Department: {
      type: String,
      enum: ["Sales", "Support", "Billing", "Technical"],
      default: "Support",
    },
    TicketBody: {
      type: String,
      required: true,
      trim: true,
    },
    Description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const TicketModel = mongoose.model("Ticket", TicketSchema);
