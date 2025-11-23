import { CreditNotes } from "../../models/client/Credit_note.model.js";
import { InvoiceModel } from "../../models/client/Invoices.model.js";
import { Transporter } from "../../util/mails/EmailTransporter.js";
import { creditNoteEmailTemplate } from "../../util/mails/templates/creditNoteEmailTemplate.js";

export const addClientCreditNote = async (req, res) => {
  try {
    const {
      Invoice: invoiceId,
      Customer: customerId,
      CreditNote: creditNoteNum,
      CreditNoteDate,
      DiscountType: discountType,
      Reference: reference,
      AdminNote: adminNote,
      packagesId,
      SubTotal: subTotal,
      Discount: discount,
      Adjustment: adjustment,
      Total: total,
      ClientNote: clientNote,
      TermsConditions: termsConditions,
      Status: status,
      sendToClient = false,
    } = req.body;

    // Fetch invoice if provided (for validation and customer details)
    let invoice;
    let customer;
    if (invoiceId) {
      invoice = await InvoiceModel.findById(invoiceId).populate("CustomerId");
      if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
      }
      customer = invoice.CustomerId;
    }

    // Create new credit note using provided data
    const newCreditNoteData = {
      Customer: customerId,
      ...(invoiceId && { Invoice: invoiceId }),
      CreditNote: creditNoteNum,
      ...(CreditNoteDate && { CreditNoteDate: new Date(CreditNoteDate) }),
      DiscountType: discountType,
      Reference: reference,
      AdminNote: adminNote,
      packagesId,
      SubTotal: subTotal,
      Discount: discount || 0,
      Adjustment: adjustment || 0,
      Total: total || 0,
      ClientNote: clientNote,
      TermsConditions: termsConditions,
      ...(status && { Status: status }),
    };

    const newCreditNote = new CreditNotes(newCreditNoteData);
    await newCreditNote.save();

    // Optional email sending
    if (sendToClient && customer) {
      const mailOptions = {
        from: `"Lets Go CRM" <${process.env.MAIL_USERNAME}>`,
        to: customer.email || "client@example.com",
        subject: `Credit Note - ${newCreditNote.CreditNote}`,
        html: creditNoteEmailTemplate({
          customerName: customer.name || "Valued Customer",
          creditNoteNumber: newCreditNote.CreditNote,
          subtotal: subTotal,
          discount: discount || 0,
          adjustment: adjustment || 0,
          total: total || 0,
        }),
      };

      await Transporter.sendMail(mailOptions);
      console.log(`📧 Credit note email sent to ${customer.email}`);
    }

    // Return populated credit note
    const populatedCreditNote = await CreditNotes.findById(newCreditNote._id)
      .populate("Customer")
      .populate("Invoice")
      .populate("packagesId");

    return res.status(201).json({
      message: "Credit Note created successfully",
      creditNote: populatedCreditNote,
    });
  } catch (error) {
    console.log("addClientCreditNote error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchClientNotes = async (req, res) => {
  try {
    const findClientNotes = await CreditNotes.find()
      .populate("Invoice")
      .populate("Customer")
      .populate("packagesId");

    // If no data found
    if (findClientNotes.length === 0) {
      return res.status(400).json({ message: "CreditNotes not found" });
    }

    return res.status(200).json({
      message: "ClientNotes fetched successfully",
      data: findClientNotes
    });
  } catch (error) {
    console.log("fetchClientNotes error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};