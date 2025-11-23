import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new Schema({
  Estimate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Estimate",
    required: true,
  },
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },
  Tags: {
    type: String,
  },
  PaymentMethod: {
    type: String,
    enum: ["Bank", "Stripe Checkout"],
    required: true,
  },
  InvoiceNumber: {
    type: String, // changed from Number → String for unique formats like INV-00123
    required: true,
    unique: true,
  },
  InvoiceDate: {
    type: Date,
    default: Date.now,
  },
  DueDate: {
    type: Date,
    required: true,
  },
  DiscountType: {
    type: String,
    default: "No Discount",
  },
  AdminNote: String,

  packagesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelPackage",
    },
  ],

  SubTotal: {
    type: Number,
    required: true,
  },
  Discount: {
    type: Number,
    default: 0,
  },
  Tax: {
    type: Number,
    default: 0,
  },
  Adjustment: {
    type: Number,
    default: 0,
  },
  Total: {
    type: Number,
    required: true,
  },

  ClientNote: String,
  TermsConditions: String,

  Status: {
    type: String,
    enum: ["Draft", "Sent", "Paid", "Overdue", "Cancelled"],
    default: "Draft",
  },
}, { timestamps: true });

export const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);