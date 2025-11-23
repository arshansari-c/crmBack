import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema({
  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer", // Reference to Customer model
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  ContractValue: {
    type: String,
  },
  ContractType: {
    type: String,
  },
  StartDate: {
    type: Date,
    required: true,
    default: Date.now, // ✅ FIXED: should be a function reference, not Date.now()
  },
  EndDate: {
    type: Date,
    required: true,
  },
  Description: {
    type: String,
  },
}, { timestamps: true });

export const ContractModel = mongoose.model("Contract", ContractSchema);
