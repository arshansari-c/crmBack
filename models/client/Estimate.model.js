import mongoose from "mongoose";

const EstimateSchema = new mongoose.Schema({
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  EstimateNumber: {
    type: String,
    unique: true,
  },
  EstimateDate: {
    type: String,
    required: true,
  },
  ProposalId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Proposal"
  },
  ExpiryDate: {
    type: String,
    required: true,
  },
  Tags: {
    type: String,
  },
  Status: {
    type: String,
    required: true,
    enum: ["Draft", "Sent", "Expired", "Declined", "Accepted"],
    default: "Draft",
  },
  Reference: {
    type: String,
  },
  DiscountType: {
    type: String,
    enum: ["No discount", "Before Tax", "After Tax"],
    default: "No discount",
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
  TAX: {
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
}, { timestamps: true });

export const EstimateModel = mongoose.model("Estimate", EstimateSchema);
