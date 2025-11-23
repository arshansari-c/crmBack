import mongoose from "mongoose";

const TravelPackageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
    },
    Images : [{
      public_id : {
        type : String,
        required : true
      },
      url : {
        type : String,
        required : true
      }
    }],
    duration: {
      nights: {
        type: Number,
        required: true,
      },
      days: {
        type: Number,
        required: true,
      },
    },

    // ✅ Changed: Reference to Hotels collection instead of embedded details
    hotels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel", // must match your Hotels model name
        required: true,
      },
    ],

    itinerary: [
      {
        day: {
          type: Number,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        activities: [String],
      },
    ],

    inclusions: [String], // e.g. "Breakfast", "Airport Pickup", "City Tour"
    exclusions: [String], // e.g. "Flight Tickets", "Personal Expenses"

    transport: {
      type: String,
      required: true,
      enum: ["Bus", "Car", "Flight", "Train", "Private SUV"],
    },

    priceDetails: {
      basePrice: {
        type: Number,
        required: true,
      },
      taxPercent: {
        type: Number,
        default: 0,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      discountPercent: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Draft"],
      default: "Active",
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const TravelPackageModel = mongoose.model("TravelPackage", TravelPackageSchema);
