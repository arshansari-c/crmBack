import { Announcement } from "../../models/client/Announcement.model.js";

export const AddAnnouncement = async (req, res) => {
  try {
    const { Subject, Message } = req.body;

    // Validate
    if (!Subject || !Message) {
      return res.status(400).json({ message: "Subject and Message are required" });
    }

    // Create
    const newAnnouncement = await Announcement.create({
      Subject,
      Message,
    });

    return res.status(201).json({
      message: "Announcement created successfully",
      announcement: newAnnouncement,
    });
  } catch (error) {
    console.log("AddAnnouncement error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const FetchAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    if (announcements.length === 0) {
      return res.status(404).json({ message: "No announcements found" });
    }

    return res.status(200).json({
      message: "Announcements fetched successfully",
      announcements,
    });
  } catch (error) {
    console.log("FetchAnnouncements error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
