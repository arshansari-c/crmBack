
// ==============================
// 📌 Add Goal

import { Goals } from "../../models/client/Goal.model.js";

// ==============================
export const AddGoals = async (req, res) => {
  try {
    const {
      Subject,
      GoalType,
      Achievement,
      StartDate,
      EndDate,
      Description,
      progress,
    } = req.body;

    // Validate required fields
    if (
      !Subject ||
      !GoalType ||
      !Achievement ||
      !StartDate ||
      !EndDate ||
      !Description
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const goal = await Goals.create({
      Subject,
      GoalType,
      Achievement,
      StartDate,
      EndDate,
      Description,
      progress,
    });

    return res.status(201).json({
      message: "Goal created successfully",
      goal,
    });
  } catch (error) {
    console.log("AddGoals error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ==============================
// 📌 Fetch All Goals
// ==============================
export const GetGoals = async (req, res) => {
  try {
    const goals = await Goals.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Goals fetched successfully",
      goals,
    });
  } catch (error) {
    console.log("GetGoals error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
