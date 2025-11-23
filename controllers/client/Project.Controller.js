import { ProjectModel } from "../../models/client/Projects.model.js";

export const addClientProject = async (req, res) => {
  try {
    const {
      ProjectName,
      Customer,
      BillingType,
      Status,
      EstimatedHours,
      StartDate,
      Deadline,
      Tags,
      Description,
    } = req.body;

    // ✅ Step 1: Validate required fields
    if (
      !ProjectName ||
      !Customer ||
      !EstimatedHours ||
      !StartDate ||
      !Deadline
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: ProjectName, Customer, EstimatedHours, StartDate, and Deadline are required.",
      });
    }

    // ✅ Step 2: Create new project
    const newProject = new ProjectModel({
      ProjectName,
      Customer,
      BillingType: BillingType || "Fixed",
      Status: Status || "Not Started",
      EstimatedHours,
      StartDate,
      Deadline,
      Tags: Tags || [],
      Description: Description || "",
    });

    // ✅ Step 3: Save to database
    await newProject.save();

    // ✅ Step 4: Send success response
    return res.status(201).json({
      message: "Project added successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("addClientProject error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


export const fetchClientProject = async (req, res) => {
  try {
    const findProject = await ProjectModel.find().populate("Customer");
    
    if (findProject.length === 0) {
      return res.status(404).json({ message: "Projects not found" });
    }
    
    return res.status(200).json({ 
      message: "Projects fetched successfully",
      data: findProject  // Include the actual projects data!
    });
  } catch (error) {
    console.log("fetchClientProject error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};