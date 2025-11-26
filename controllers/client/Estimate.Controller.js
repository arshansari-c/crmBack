import { EstimateModel } from "../../models/client/Estimate.model.js";
import { ProposalModel } from "../../models/client/Proposal.model.js";
import { estimateEmailTemplate } from "../../util/mails/templates/estimateEmailTemplate.js";
import { Transporter } from "../../util/mails/EmailTransporter.js";
import dotenv from "dotenv";
dotenv.config();

export const addClientEstimateAndSave = async (req, res) => {
  try {
    const {
      ProposalId: proposalId, // Match incoming casing
      Customer: incomingCustomerId, // Match incoming casing (but we'll override with proposal's customerId)
      SubTotal, // Added: Use provided subtotal from frontend
      Discount,
      TAX,
      Adjustment,
      discountType,
      estimateDate,
      expiryDate,
      reference,
      clientNote,
      sendToClient,
      termsConditions,
      tags,
      adminNote,
      EstimateNumber: providedEstimateNumber, // Optional override
    } = req.body;
console.log("📥 Incoming Estimate Request Body:", req.body);

    // Validate required fields
    if (!proposalId) {
      return res.status(400).json({
        message: "proposalId is required.",
      });
    }

    // ---------------------------
    // 1️⃣ Fetch Proposal + Packages
    // ---------------------------
    const proposal = await ProposalModel.findById(proposalId).populate("packages.id");
    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found. Invalid proposalId.",
      });
    }

    // Use proposal's customerId to ensure correctness (override incoming if mismatched)
    const customerId = proposal.customerId || incomingCustomerId;
    if (!customerId) {
      return res.status(400).json({
        message: "Valid customerId is required (from proposal or request).",
      });
    }

    // ---------------------------
    // 2️⃣ Use Provided or Calculate Subtotal + Total
    // ---------------------------
    const round = (num) => Math.round(num * 100) / 100;
    let subtotal;
    if (SubTotal !== undefined) {
      // Use provided subtotal from frontend (already calculated)
      subtotal = round(parseFloat(SubTotal) || 0);
    } else {
      // Fallback: Calculate from proposal packages if not provided
      subtotal = round(
        proposal.packages.reduce((sum, pkg) => {
          const qty = pkg.qty || 1;
          const rate = parseFloat(pkg.rate) || 0;
          return sum + qty * rate;
        }, 0)
      );
    }

    // Use absolute values from request body (defaults to 0 if not provided)
    const discount = parseFloat(Discount) || 0;
    const tax = parseFloat(TAX) || 0;
    const adjustment = parseFloat(Adjustment) || 0;
    const total = round(subtotal - discount + tax + adjustment);

    // ---------------------------
    // 3️⃣ Generate or Use Estimate Number
    // ---------------------------
    let estimateNumber = providedEstimateNumber;
    if (!estimateNumber) {
      estimateNumber = `EST-${Date.now()}`;
    } else {
      // Check uniqueness if provided
      const existing = await EstimateModel.findOne({ EstimateNumber: estimateNumber });
      if (existing) {
        return res.status(400).json({
          message: "Provided EstimateNumber already exists. Please use a unique one.",
        });
      }
    }

    // ---------------------------
    // 4️⃣ Create Estimate
    // ---------------------------
    const newEstimate = new EstimateModel({
      Customer: customerId,
      ProposalId: proposalId,
      EstimateNumber: estimateNumber,
      EstimateDate: estimateDate || new Date().toISOString().split('T')[0], // Default to today if missing
      ExpiryDate: expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default 30 days
      Reference: reference,
      DiscountType: discountType || "No discount",
      AdminNote: adminNote || "",
      Tags: tags || "",
      packagesId: proposal.packages.map((pkg) => pkg.id._id),
      SubTotal: subtotal,
      Discount: discount,
      TAX: tax,
      Adjustment: adjustment,
      Total: total,
      ClientNote: clientNote || "",
      TermsConditions: termsConditions || "",
      Status: sendToClient ? "Sent" : "Draft",
    });
    await newEstimate.save();

    // ---------------------------
    // 5️⃣ Email Client (Optional)
    // ---------------------------
    if (sendToClient && proposal.email) {
      await Transporter.sendMail({
        from: `"Lets Go CRM" <${process.env.MAIL_USERNAME}>`,
        to: proposal.email,
        subject: `New Estimate - ${estimateNumber}`,
        html: estimateEmailTemplate({
          customerName: proposal.subject || "Valued Customer",
          estimateNumber,
          subtotal,
          discount,
          tax,
          total,
        }),
      });
      console.log(`📧 Email sent to ${proposal.email}`);
    } else if (sendToClient && !proposal.email) {
      console.warn("⚠️ sendToClient is true, but no email found in proposal.");
    }

    // ---------------------------
    // 6️⃣ Response
    // ---------------------------
    return res.status(201).json({ // Use 201 for created
      message: "Estimate created successfully",
      emailSent: !!sendToClient,
      estimate: newEstimate,
    });
  } catch (error) {
    console.error("❌ addClientEstimateAndSave error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const fetchEstimates = async (req, res) => {
  try {
    const findEstimate = await EstimateModel.find()
      .populate("Customer ProposalId packagesId");
    if (findEstimate.length === 0) {
      return res.status(404).json({
        message: "No estimates found",
        estimates: [],
      });
    }
    return res.status(200).json({
      message: "Estimates fetched successfully",
      estimates: findEstimate,
    });
  } catch (error) {
    console.log("fetchEstimate error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};