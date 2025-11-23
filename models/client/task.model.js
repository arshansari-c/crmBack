import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    Subject: {
      type: String,
      required: true,
      trim: true,
    },
    StartDate: {
      type: Date,
      required: true,
    },
    DueDate: {
      type: Date,
      required: true,
    },
    Priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    RepeatEvery: {
      type: String,
      default: "None",
    },
    RelatedTo: {
      type: String,
      required: true,
      enum: [
        "Project",
        "Invoice",
        "Customer",
        "Estimate",
        "Contract",
        "Ticket",
        "Expense",
        "Lead",
        "Proposal",
      ],
    },
    RelatedId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "RelatedTo", // 👈 this line makes it dynamic
      required: true,
    },
    Tags: {
      type: [String],
      default: [],
    },
    TaskDescription: {
      type: String,
      trim: true,
    },
    Status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "On Hold"],
      default: "Not Started",
    },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model("Task", taskSchema);
