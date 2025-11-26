import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    Subject: {
      type: String,
      required: true,
      trim: true,
    },

    GoalType: {
      type: String,
      required: true,
      enum: [
        "Personal",
        "Business",
        "Fitness",
        "Education",
        "Financial",
        "Health",
        "Career",
        "Other",
      ], // add your custom types here
    },

    Achievement: {
      type: String,
      required: true,
    },

    StartDate: {
      type: String,
      required: true,
    },

    EndDate: {
      type: String,
      required: true,
    },

    Description: {
      type: String,
      required: true,
    },

    progress: {
      type: Number,
      required: true,
      default: 0,
      min: 1,
      max: 100,
    },
  },
  { timestamps: true }
);

export const Goals = mongoose.model("Goals", GoalSchema);
