import { TaskModel } from "../../models/client/task.model.js";

export const addClientTask = async (req, res) => {
  try {
    const {
      Subject,
      StartDate,
      DueDate,
      Priority,
      RepeatEvery,
      RelatedTo,
      RelatedId,
      Tags,
      TaskDescription,
      Status,
    } = req.body;

    // Basic validation
    if (!Subject || !StartDate || !DueDate || !RelatedTo || !RelatedId) {
      return res.status(400).json({
        message: "Subject, StartDate, DueDate, RelatedTo, and RelatedId are required.",
      });
    }

    // Create new task
    const newTask = new TaskModel({
      Subject,
      StartDate,
      DueDate,
      Priority: Priority || "Medium",
      RepeatEvery: RepeatEvery || "None",
      RelatedTo,
      RelatedId,
      Tags: Tags || [],
      TaskDescription,
      Status: Status || "Not Started",
    });

    // Save task in DB
    await newTask.save();

    return res.status(201).json({
      message: "Client task added successfully",
      task: newTask,
    });
  } catch (error) {
    console.log("addClientTask error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const fetchTasks = async (req, res) => {
  try {
    const findTask = await TaskModel.find()
      .populate('RelatedId')  // Optional: Populate related project/customer if schema supports it
      .sort({ createdAt: -1 });  // Optional: Sort by newest first
    
    if (findTask.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    
    return res.status(200).json({ 
      message: "Tasks fetched successfully",
      tasks: findTask  // Clear key for the data
    });
  } catch (error) {
    console.log("fetchTasks error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};