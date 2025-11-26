import { CreditNotes } from "../../models/client/Credit_note.model.js"
import { EstimateModel } from "../../models/client/Estimate.model.js"
import { InvoiceModel } from "../../models/client/Invoices.model.js"
import { ProposalModel } from "../../models/client/Proposal.model.js"

export const fetchAllItems = async (req, res) => {
    try {
        const findProposals = await ProposalModel.find().populate(["customerId", "packages.id"])
        const findEstimates = await EstimateModel.find().populate("Customer");
        const findInvoices = await InvoiceModel.find().populate(["Estimate", "CustomerId", "packagesId"]);
        const findAllCreditNotes = await CreditNotes.find().populate(["Customer", "Invoice", "packagesId"]);
        return res.status(200).json({
            message: "fetchAllItems successfully",
            findProposals,
            findEstimates,
            findInvoices,
            findAllCreditNotes
        });
    } catch (error) {
        console.log("fetchAllItems error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const fetchAllInvoice = async (req, res) => {
  try {
    const findInvoice = await InvoiceModel.find()
      .populate("Estimate CustomerId packagesId").limit(4);

    if (findInvoice.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.status(200).json({
      message: "Invoice fetched successfully",
      findInvoice,
    });
  } catch (error) {
    console.log("fetchAllInvoice error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const fetchAllInvoices = async (req, res) => {
  try {
    const findInvoice = await InvoiceModel.find()
      .populate("Estimate CustomerId packagesId");

    if (findInvoice.length === 0) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    return res.status(200).json({
      message: "Invoice fetched successfully",
      findInvoice,
    });
  } catch (error) {
    console.log("fetchAllInvoice error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



