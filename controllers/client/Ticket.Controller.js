import { TicketModel } from "../../models/client/Ticket.model.js";

export const addClientTicket = async (req, res) => {
  try {
    const {
      subject,
      tags,
      customer,
      priority,
      status,
      department,
      ticketBody,
      description,
    } = req.body;

    // ✅ Step 1: Validate required fields
    if (
      !subject ||
      !customer ||
      !ticketBody
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: subject, contact, and ticketBody are required.",
      });
    }

    // ✅ Step 2: Normalize tags to array
    const normalizedTags = Array.isArray(tags)
      ? tags.map(tag => (typeof tag === 'string' ? tag.trim() : tag).filter(Boolean))
      : (tags && typeof tags === 'string'
          ? tags.split(",").map(tag => tag.trim()).filter(Boolean)
          : []);

    // ✅ Step 3: Create a new ticket
    const newTicket = new TicketModel({
      Subject: subject,
      Tags: normalizedTags,
      Customer : customer,
      Priority: priority || "Medium",
      Status: status || "Open",
      Department: department || "Support",
      TicketBody: ticketBody,
      Description: description || "",
    });

    // ✅ Step 4: Save to DB
    await newTicket.save();

    // ✅ Step 5: Return response
    return res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (error) {
    console.log("addClientTicket error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const fetchTickets = async (req, res) => {
  try {
    const tickets = await TicketModel.find().populate("Customer");
    
    return res.status(200).json({
      message: "Tickets fetched successfully",
      data: tickets
    });
  } catch (error) {
    console.log("fetchTickets error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};