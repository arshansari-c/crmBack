import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  ExpensePdf: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],

  RepeatEveryMonths: {
    type: String,
    enum: ["Week", "2 Weeks", "1 Month", "2 Months", "3 Months", "6 Months", "1 Year", "None"],
    default: "None",
  },

  Name: {
    type: String,
    required: true,
  },

  Reference: {
    type: String,
  },

  ExpenseCategory: {
    type: String,
    required: true,
  },

  ExpenseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  Amount: {
    type: Number, // 💡 should be Number for math calculations (not String)
    required: true,
  },

  Tax1: {
    type: Number,
    default: 0,
  },

  Tax2: {
    type: Number,
    default: 0,
  },

  PaymentMode: {
    type: String,
    required: true,
    enum: ["Bank", "Stripe Checkout", "Cash", "UPI"],
  },

  Customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },

  Notes: {
    type: String,
  },
}, { timestamps: true });

// ✅ Make ExpensePdf optional by adding default empty array
ExpenseSchema.path('ExpensePdf').default([]);

export const ExpenseModel = mongoose.model("Expense", ExpenseSchema);