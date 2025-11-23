import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    ProjectName: {
      type: String,
      required: true,
      trim: true,
    },
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    BillingType: {
      type: String,
      enum: ["Fixed", "Hourly", "Milestone", "Other"],
      default: "Fixed",
    },
    Status: {
      type: String,
      required: true,
      enum: ["Not Started", "In Progress", "On Hold", "Cancelled", "Finished"],
      default: "Not Started",
    },
    EstimatedHours: {
      type: Number,
      required: true,
    },
    StartDate: {
      type: Date,
      required: true,
    },
    Deadline: {
      type: Date,
      required: true,
    },
    Tags: {
      type: [String],
      default: [],
    },
    Description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model("Project", ProjectSchema);
