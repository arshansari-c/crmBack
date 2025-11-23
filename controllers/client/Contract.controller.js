import { ContractModel } from "../../models/client/Contracts.model.js";

export const addClientContract = async (req, res) => {
  try {
    const {
      Customer,
      Subject,
      ContractValue,
      ContractType,
      StartDate,
      EndDate,
      Description,
    } = req.body;

    // ✅ Validate required fields
    if (!Customer || !Subject || !StartDate || !EndDate) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // ✅ Create and save the new contract
    const newContract = await ContractModel.create({
      Customer,
      Subject,
      ContractValue,
      ContractType,
      StartDate,
      EndDate,
      Description,
    });

    return res.status(201).json({
      message: "Contract added successfully",
      contract: newContract,
    });
  } catch (error) {
    console.log("addClientContract error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const fetchContract = async (req, res) => {
  try {
    const contracts = await ContractModel.find().populate("Customer");

    if (contracts.length === 0) {
      return res.status(404).json({ message: "No contracts found" });
    }

    return res.status(200).json({
      message: "Contracts fetched successfully",
      contracts
    });

  } catch (error) {
    console.log("fetchContract error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
