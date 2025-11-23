import {AddCustomerModel} from '../../models/client/AddCustomer.model.js'
// Add New Customer Controller
export const addCustomer = async (req, res) => {
  try {
    const {
      company,
      vatNumber,
      phone,
      website,
      group, // Array or string (High Budget, VIP, etc.)
      currency,
      defaultLanguage,
      address,
      city,
      state,
      zipCode,
      country,
    } = req.body;

    // Basic validation
    if (!company || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Company and phone number are required.',
      });
    }

    // Create new customer
    const newCustomer = new AddCustomerModel({
      company,
      vatNumber,
      phone,
      website,
      group,
      currency,
      defaultLanguage,
      address,
      city,
      state,
      zipCode,
      country,
    });

    await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: 'Customer added successfully.',
      data: newCustomer,
    });
  } catch (error) {
    console.error('Error adding customer:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error.',
      error: error.message,
    });
  }
};

export const fetchAllCustomers = async (req, res) => {
  try {
    const customers = await AddCustomerModel.find();

    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }

    return res.status(200).json({
      message: "Customers fetched successfully",
      customers, // ✅ Send the data back
    });
  } catch (error) {
    console.error("fetchAllCustomers error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


