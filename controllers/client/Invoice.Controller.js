import { InvoiceModel } from "../../models/client/Invoices.model.js";
import { EstimateModel } from "../../models/client/Estimate.model.js";
import { Transporter } from "../../util/mails/EmailTransporter.js";
import { invoiceEmailTemplate } from "../../util/mails/templates/invoiceEmailTemplate.js";
import { AddCustomerModel } from "../../models/client/AddCustomer.model.js";

export const addClientInvoicesAndSend = async (req, res) => {
  try {
    const {
      estimateId,
      customerId,
      paymentMethod,
      discountPercent,
      taxPercent,
      adjustment,
      dueDate,
      Total: providedSubtotal, // Treating 'Total' from request as the subtotal/base amount
      clientNote,
      termsConditions,
      sendToClient
    } = req.body;

    // ✅ Fetch estimate with packages and customer (for reference, packages, and fallback customer)
    const estimate = await EstimateModel.findById(estimateId).populate(["packagesId", "Customer"]);
    if (!estimate) {
      return res.status(404).json({ message: "Estimate not found" });
    }

    // ✅ Use provided subtotal from request (ignores estimate.SubTotal as per requirement)
    const subtotal = providedSubtotal;
    if (subtotal === 0 || subtotal == null) {
      return res.status(400).json({ message: "Subtotal (provided as 'Total') is zero or missing" });
    }

    // ✅ Calculate discount and tax based on provided subtotal
    const discount = discountPercent ? (subtotal * discountPercent) / 100 : 0;
    const tax = taxPercent ? (subtotal * taxPercent) / 100 : 0;
    const finalAdjustment = adjustment || 0;
    const finalTotal = subtotal - discount + tax + finalAdjustment;

    // ✅ Create invoice number
    const invoiceNumber = `INV-${Date.now()}`;

    // ✅ Fetch customer email (fallback to estimate.Customer if needed)
    const customer = await AddCustomerModel.findById(customerId).select("email");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const customerEmail = customer.email;

    // ✅ Create and save invoice
    const newInvoice = new InvoiceModel({
      Estimate: estimateId,
      PaymentMethod: paymentMethod,
      InvoiceNumber: invoiceNumber,
      CustomerId: customerId,
      InvoiceDate: new Date(),
      DueDate: dueDate,
      DiscountType: discountPercent ? `${discountPercent}%` : "No Discount",
      packagesId: estimate.packagesId.map((pkg) => pkg._id),
      SubTotal: subtotal,
      Discount: discount,
      Tax: tax,
      Adjustment: finalAdjustment,
      Total: finalTotal,
      ClientNote: clientNote,
      TermsConditions: termsConditions,
      Status: sendToClient ? "Sent" : "Draft",
    });

    await newInvoice.save();

    // ✅ Send invoice to client via email
    if (sendToClient) {
      const clientEmail = customerEmail || estimate.Customer?.email;
      if (!clientEmail) {
        console.warn("No valid email found for client");
      } else {
        const mailOptions = {
          from: `"Lets Go CRM" <${process.env.MAIL_USERNAME}>`,
          to: clientEmail,
          subject: `Invoice ${invoiceNumber} from Lets Go`,
          html: invoiceEmailTemplate({
            customerName: estimate.Customer?.name || "Valued Customer",
            invoiceNumber,
            subtotal,
            discount,
            tax,
            total: finalTotal,
            dueDate,
          }),
        };

        await Transporter.sendMail(mailOptions);
        console.log(`📧 Invoice email sent to ${clientEmail}`);
      }
    }

    return res.status(201).json({
      message: "Invoice created successfully",
      invoice: newInvoice,
    });
  } catch (error) {
    console.log("addClientInvoiceAndSend error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchInvoiceList = async (req, res) => {
  try {
    const findInvoice = await InvoiceModel.find().populate("Estimate packagesId CustomerId").limit(4);
    if (findInvoice.length === 0) {
      return res.status(400).json({ message: "Invoice not found" });
    }
    return res.status(200).json({ message: "Invoice fetched successfully", data: findInvoice });
  } catch (error) {
    console.log("fetchInvoice error", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};