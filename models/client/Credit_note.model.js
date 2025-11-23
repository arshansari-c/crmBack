import mongoose, { Schema } from "mongoose";

const CreditNoteSchema = new Schema({
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  Invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
  },
  CreditNote: {
    type: String,
    required: true,
    unique: true,
  },
  CreditNoteDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  DiscountType: {
    type: String,
    required: true,
    enum: ["No discount", "Before Tax", "After Tax"],
  },
  Reference: {
    type: String,
  },
  AdminNote: String,

  packagesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TravelPackage",
    },
  ],

  SubTotal: { type: Number, required: true },
  Discount: { type: Number, default: 0 },
  Adjustment: { type: Number, default: 0 },
  Total: { type: Number, default: 0 },

  ClientNote: String,
  TermsConditions: String,

  Status: {
    type: String,
    enum: ["Draft", "Sent", "Applied", "Void"],
    default: "Draft",
  },
}, { timestamps: true });

export const CreditNotes = mongoose.model("CreditNote", CreditNoteSchema);