import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    Subject: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Announcement = mongoose.model("Announcement", AnnouncementSchema);
