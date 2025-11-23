import { KnowledgeRequestModel } from "../../models/client/KnowlageRequest.model.js";

export const addKnowledgeRequest = async (req, res) => {
  try {
    const { Subject, Group, ArticleDescription } = req.body;

    // ✅ Validate required fields
    if (!Subject || !Group) {
      return res.status(400).json({ message: "Subject and Group are required" });
    }

    // ✅ Create new Knowledge Request
    const newRequest = new KnowledgeRequestModel({
      Subject,
      Group,
      ArticleDescription,
    });

    // ✅ Save to DB
    await newRequest.save();

    return res.status(201).json({
      message: "Knowledge request added successfully",
      request: newRequest,
    });
  } catch (error) {
    console.log("addKnowledgeRequest error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchKnowledgeRequest = async (req, res) => {
  try {
    const knowledgeRequests = await KnowledgeRequestModel.find(); // Renamed for clarity
    if (knowledgeRequests.length === 0) {
      return res.status(404).json({ message: 'No knowledge requests found' });
    }
    return res.status(200).json({ 
      message: 'Knowledge requests fetched successfully',
      data: knowledgeRequests // Include the actual data!
    });
  } catch (error) {
    console.error('fetchKnowledgeRequest error:', error); // Use console.error for better visibility
    return res.status(500).json({ message: 'Internal server error' });
  }
};