import { ProposalModel } from "../../models/client/Proposal.model.js";
import { Transporter } from "../../util/mails/EmailTransporter.js";
import { ProposalTemplate } from "../../util/mails/templates/ProposalTemplate.js";

export const AddProposal = async (req, res) => {
  try {
    const proposalData = req.body;

    // 🔹 Basic validation
    const requiredFields = [
      "subject", "related", "customerId", "openTill", "discountType", "status",
      "city", "state", "country", "zipCode", "email", "phone", "packages",
      "subTotal", "discount", "total", "sendtoclient"
    ];

    for (const field of requiredFields) {
      if (proposalData[field] === undefined || proposalData[field] === "") {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // 🔹 Save proposal to DB
    const newProposal = new ProposalModel(proposalData);
    await newProposal.save();

    // 🔹 Send email only if sendtoclient is true
    if (proposalData.sendtoclient === true || proposalData.sendtoclient === "true") {
      try {
        const html = ProposalTemplate(proposalData);

        await Transporter.sendMail({
          from: `"Lets Go" <${process.env.MAIL_USERNAME}>`,
          to: proposalData.email,
          subject: `Proposal Created: ${proposalData.subject}`,
          html,
        });

        console.log(`📧 Proposal email sent to ${proposalData.email}`);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return res.status(201).json({
      message: "Proposal created successfully",
      proposal: newProposal,
    });
  } catch (error) {
    console.error("AddProposal error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchUsersProposals = async (req, res) => {
  try {
    const proposals = await ProposalModel.find()
      .populate("customerId")   // populate customer
      .populate({
        path: "packages.id",    // populate each package id
        model: "TravelPackage",
      });

    if (!proposals || proposals.length === 0) {
      return res.status(404).json({ message: "No proposals found" });
    }

    return res.status(200).json({
      message: "Proposals fetched successfully",
      proposals,
    });
  } catch (error) {
    console.error("fetchUsersProposals error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
