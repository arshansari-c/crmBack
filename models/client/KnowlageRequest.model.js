import mongoose, { Schema } from "mongoose";

const KnowledgeRequestSchema = new Schema(
  {
    Subject: {
      type: String,
      required: true,
      trim: true,
    },
    Group: {
      type: String,
      required: true,
      enum: ["Sales", "Info", "Abuse", "Licence", "Company"],
    },
    ArticleDescription: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // ✅ adds createdAt and updatedAt automatically
);

export const KnowledgeRequestModel = mongoose.model("KnowledgeRequest", KnowledgeRequestSchema);
