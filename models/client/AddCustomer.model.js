import mongoose from "mongoose";

const AddCustomerSchema = new mongoose.Schema(
  {
    // 🔹 Basic Customer Details
    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    vatNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: null,
    },
  phone: {
  type: String,
  required: true,
  trim: true,
  match: [/^(\+?\d{7,15}|\d{10})$/, "Invalid phone number format"],
},

    website: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "Invalid website URL",
      ],
      default: null,
    },

    // 🔹 Customer Group / Type
    group: {
      type: String,
      enum: ["High Budget", "Low Budget", "VIP", "Wholesaler"],
      required: true,
    },

    // 🔹 Finance & Localization
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP", "JPY", "CNY", "AUD"],
      default: "INR",
    },
    defaultLanguage: {
      type: String,
      enum: [
        "English",
        "Hindi",
        "French",
        "German",
        "Spanish",
        "Chinese",
        "Arabic",
      ],
      default: "English",
    },

    // 🔹 Billing & Shipping Address
    address: {
      type: String,
      trim: true,
      maxlength: 200,
      default: null,
    },
    city: {
      type: String,
      trim: true,
      maxlength: 50,
      default: null,
    },
    state: {
      type: String,
      trim: true,
      maxlength: 50,
      default: null,
    },
    zipCode: {
      type: String,
      trim: true,
      match: [/^[0-9]{5,6}$/, "Invalid ZIP/Postal Code"],
      default: null,
    },
    country: {
      type: String,
      enum: [
        "India",
        "United States",
        "United Kingdom",
        "Canada",
        "Australia",
        "Germany",
        "France",
        "Japan",
        "China",
        "Other",
      ],
      default: "India",
    },

    // 🔹 CRM Internal Tracking
    createdBy: {
      type: String, // could store admin ID or "system"
      default: "system",
    },
    updatedBy: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
    versionKey: false,
  }
);

// Indexing for performance
AddCustomerSchema.index({ company: 1 });
AddCustomerSchema.index({ phone: 1 });
AddCustomerSchema.index({ vatNumber: 1 });

export const AddCustomerModel = mongoose.model("Customer", AddCustomerSchema);
