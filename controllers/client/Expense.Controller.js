import { ExpenseModel } from "../../models/client/Expense.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

// ✅ Add Client Expense Controller
export const addClientExpense = async (req, res) => {
  try {
    const {
      name,
      reference,
      expenseCategory,
      repeatEveryMonths,
      amount,
      tax1,
      tax2,
      paymentMode,
      customerId,
      notes,
      expenseDate,
    } = req.body;

    // ✅ Step 1: Validate required fields
    if (
      !name ||
      !reference ||
      !expenseCategory ||
      !amount ||
      !paymentMode ||
      !expenseDate
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: name, reference, expenseCategory, amount, paymentMode, expenseDate are required.",
      });
    }

    // ✅ Step 2: Handle optional PDF upload
    let expensePdfData = []; // Default to empty array if no file

    if (req.files && req.files.ExpensePdf) {
      const ExpenseFile = req.files.ExpensePdf;
      const fileExt = path.extname(ExpenseFile.name).toLowerCase();

      if (fileExt !== ".pdf") {
        return res.status(400).json({ message: "Only PDF files are allowed." });
      }

      // ✅ Step 3: Configure Cloudinary
cloudinary.config({
  cloud_name: "dfzwhnmkf",
  api_key: "914852376311246",
  api_secret: "TK-APF-cbbc7pXPupHJc2fwxnWs",
});


      // ✅ Step 4: Upload file to Cloudinary
      const uploadFile = await cloudinary.uploader.upload(ExpenseFile.tempFilePath, {
        folder: "expenses",
        resource_type: "auto",
      });

      if (!uploadFile) {
        return res.status(400).json({ message: "Failed to upload PDF." });
      }

      // ✅ Step 5: Delete the temporary file after upload
      try {
        fs.unlinkSync(ExpenseFile.tempFilePath);
        console.log("🧹 Temp file deleted:", ExpenseFile.tempFilePath);
      } catch (err) {
        console.error("Failed to delete temp file:", err.message);
      }

      // ✅ Set PDF data if uploaded
      expensePdfData = [
        {
          public_id: uploadFile.public_id,
          url: uploadFile.secure_url,
        },
      ];
    }

    // ✅ Step 6: Calculate total amount (with taxes)
    const numericAmount = Number(amount);
    const numericTax1 = Number(tax1) || 0;
    const numericTax2 = Number(tax2) || 0;

    const taxTotal =
      (numericAmount * numericTax1) / 100 + (numericAmount * numericTax2) / 100;
    const totalAmount = numericAmount + taxTotal;

    // ✅ Step 7: Create and save expense
    const newExpense = new ExpenseModel({
      ExpensePdf: expensePdfData,
      RepeatEveryMonths: repeatEveryMonths || "None",
      Name: name,
      Reference: reference,
      ExpenseCategory: expenseCategory,
      ExpenseDate: expenseDate || new Date(),
      Amount: totalAmount,
      Tax1: numericTax1,
      Tax2: numericTax2,
      PaymentMode: paymentMode,
      Customer: customerId || null,
      Notes: notes || "",
    });

    await newExpense.save();

    // ✅ Step 8: Send response
    return res.status(201).json({
      message: "Expense added successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.error("addClientExpense error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const fetchClientExpense = async (req, res) => {
  try {
    const findExpense = await ExpenseModel.find().populate("Customer");

    if (findExpense.length === 0) {
      return res.status(404).json({ message: "Expenses not found" });
    }

    return res.status(200).json({
      message: "Expenses fetched successfully",
      expenses: findExpense,
    });
  } catch (error) {
    console.log("fetchClientExpense error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};