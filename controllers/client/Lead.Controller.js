import { LeadModel } from "../../models/client/Lead.model.js";

export const addLeads = async (req, res) => {
  try {
    const {
      Status,
      Source,
      Name,
      Address,
      Position,
      City,
      Email,
      State,
      Website,
      Phone,
      Zipcode,
      LeadValue,
      Company,
      Description,
    } = req.body;

    // ✅ Step 1: Validate required fields
    if (!Status || !Source || !Name || !Address) {
      return res.status(400).json({
        message:
          "Missing required fields: Status, Source, Name, and Address are required.",
      });
    }

    // ✅ Step 2: Create new lead document
    const newLead = new LeadModel({
      Status,
      Source,
      Name,
      Address,
      Position: Position || "",
      City: City || "",
      Email: Email || "",
      State: State || "",
      Website: Website || "",
      Phone: Phone || "",
      Zipcode: Zipcode || "",
      LeadValue: LeadValue || 0,
      Company: Company || "",
      Description: Description || "",
    });

    // ✅ Step 3: Save to database
    await newLead.save();

    // ✅ Step 4: Send success response
    return res.status(201).json({
      message: "Lead added successfully",
      lead: newLead,
    });
  } catch (error) {
    console.error("addLeads error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const fetchLeads = async (req, res) => {
  try {
    const leads = await LeadModel.find();
    
    return res.status(200).json({
      message: "Leads fetched successfully",
      data: leads
    });
  } catch (error) {
    console.log("fetchLeads error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};