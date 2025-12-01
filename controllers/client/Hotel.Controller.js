import HotelsModel from "../../models/client/Hotels.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CLIENT_RENEG_LIMIT } from "tls";

// ✅ Cloudinary Config (better: move to a separate config file)
cloudinary.config({
  cloud_name: "dfzwhnmkf",
  api_key: "914852376311246",
  api_secret: "TK-APF-cbbc7pXPupHJc2fwxnWs",
});


// ✅ Add New Hotel Controller
export const addHotel = async (req, res) => {
  try {
    const {
      name,
      description,
      stars,
      status,
      address: addressRaw,
      amenities: amenitiesRaw,
      policies: policiesRaw,
      rooms: roomsRaw,
      contact: contactRaw,
    } = req.body;

    // Step 1: Validate basic fields
    if (!name || !description || !stars) {
      return res.status(400).json({
        message: "Name, description, and stars are required.",
      });
    }

    // Step 2: Handle file upload
    const hotelImages = req.files?.hotelimages;
    if (!hotelImages) {
      return res.status(400).json({ message: "Hotel images are required." });
    }

    // Step 3: Parse JSON fields safely
    const safeParse = (input, expectedType, fieldName) => {
      if (!input) return expectedType === "array" ? [] : {};
      if (typeof input === "string") {
        try {
          const parsed = JSON.parse(input);
          if (expectedType === "array" && !Array.isArray(parsed))
            throw new Error("Expected array");
          if (expectedType === "object" && Array.isArray(parsed))
            throw new Error("Expected object");
          return parsed;
        } catch (err) {
          throw new Error(`Invalid ${fieldName} format. Must be valid JSON.`);
        }
      }
      if (expectedType === "array" && Array.isArray(input)) return input;
      if (expectedType === "object" && typeof input === "object") return input;
      throw new Error(`Invalid ${fieldName} format.`);
    };

    const parsedAddress = safeParse(addressRaw, "object", "address");
    const parsedAmenities = safeParse(amenitiesRaw, "array", "amenities");
    const parsedPolicies = safeParse(policiesRaw, "object", "policies");
    const parsedRooms = safeParse(roomsRaw, "array", "rooms");
    const parsedContact = safeParse(contactRaw, "object", "contact");

    if (!parsedAddress.city || !parsedAddress.country) {
      return res
        .status(400)
        .json({ message: "Address must include city and country." });
    }

    // Step 4: Validate room fields
    for (let i = 0; i < parsedRooms.length; i++) {
      const room = parsedRooms[i];
      if (
        !room.roomType ||
        !room.roomNumber ||
        !room.pricePerNight ||
        !room.maxOccupancy
      ) {
        return res.status(400).json({
          message: `Room ${i + 1} missing required fields: roomType, roomNumber, pricePerNight, maxOccupancy.`,
        });
      }
    }

    // Step 5: Upload hotel images to Cloudinary
    const uploadImages = [];
    const filesArray = Array.isArray(hotelImages)
      ? hotelImages
      : [hotelImages];

    for (const file of filesArray) {
      const upload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "hotelimages",
        resource_type: "auto",
      });
      uploadImages.push({
        public_id: upload.public_id,
        url: upload.secure_url,
      });

      // Cleanup temp file
      try {
        fs.unlinkSync(file.tempFilePath);
      } catch (err) {
        console.error("Failed to delete temp file:", err.message);
      }
    }

    // Step 6: Create and save the hotel
    const newHotel = new HotelsModel({
      name: name.trim(),
      description: description.trim(),
      stars: parseInt(stars, 10),
      status: status || "Active",
      address: parsedAddress,
      amenities: parsedAmenities,
      hotelimages: uploadImages,
      policies: parsedPolicies,
      rooms: parsedRooms,
      contact: parsedContact,
    });

    await newHotel.save();

    // Step 7: Return response
    return res.status(201).json({
      message: "Hotel added successfully",
      hotel: newHotel,
    });
  } catch (error) {
    console.error("❌ addHotel error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const fetchHotels = async (req, res) => {
  try {
    const findHotels = await HotelsModel.find().select("_id name");

    if (findHotels.length === 0) {
      return res.status(200).json({
        message: "No hotels found",
        hotels: [],
      });
    }

    return res.status(200).json({
      message: "Hotels fetched successfully",
      hotels: findHotels,
    });

  } catch (error) {
    console.log("fetchHotels error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchHotelsLists = async (req, res) => {
  try {
    const findHotels = await HotelsModel.find();

    if (findHotels.length === 0) {
      return res.status(404).json({ message: "Hotels not found" });
    }

    return res.status(200).json({
      message: "Hotels fetched successfully",
      data: findHotels
    });

  } catch (error) {
    console.log("fetchHotelsLists error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
