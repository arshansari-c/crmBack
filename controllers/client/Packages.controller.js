import { TravelPackageModel } from "../../models/client/Packages.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// ✅ Cloudinary Config (same as in Hotels controller)
cloudinary.config({
  cloud_name: "dfzwhnmkf",
  api_key: "914852376311246",
  api_secret: "TK-APF-cbbc7pXPupHJc2fwxnWs",
});


export const addPackages = async (req, res) => {
  try {
    const {
      packageName,
      destination,
      duration: durationRaw,
      hotels: hotelsRaw,
      itinerary: itineraryRaw,
      inclusions: inclusionsRaw,
      exclusions: exclusionsRaw,
      transport,
      priceDetails: priceDetailsRaw,
      status,
      notes,
    } = req.body;

    // ✅ Step 1: Validate essential fields
    if (!packageName || !destination || !durationRaw || !priceDetailsRaw) {
      return res.status(400).json({
        message:
          "packageName, destination, duration, and priceDetails are required.",
      });
    }

    // ✅ Step 2: Safe JSON parser function
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

    // ✅ Step 3: Parse all JSON fields
    const parsedDuration = safeParse(durationRaw, "object", "duration");
    const parsedHotels = safeParse(hotelsRaw, "array", "hotels");
    const parsedItinerary = safeParse(itineraryRaw, "array", "itinerary");
    const parsedInclusions = safeParse(inclusionsRaw, "array", "inclusions");
    const parsedExclusions = safeParse(exclusionsRaw, "array", "exclusions");
    const parsedPriceDetails = safeParse(priceDetailsRaw, "object", "priceDetails");

    // ✅ Step 4: Handle image upload
    const packageImages = req.files?.Images;
    if (!packageImages) {
      return res.status(400).json({ message: "Package images are required." });
    }

    const uploadImages = [];
    const filesArray = Array.isArray(packageImages)
      ? packageImages
      : [packageImages];

    for (const file of filesArray) {
      const upload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "packageimages",
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

    // ✅ Step 5: Create and save the package
    const newPackage = new TravelPackageModel({
      packageName: packageName.trim(),
      destination: destination.trim(),
      Images: uploadImages,
      duration: parsedDuration,
      hotels: parsedHotels,
      itinerary: parsedItinerary,
      inclusions: parsedInclusions,
      exclusions: parsedExclusions,
      transport: transport || "Private SUV",
      priceDetails: parsedPriceDetails,
      status: status || "Active",
      notes,
    });

    await newPackage.save();

    // ✅ Step 6: Return success
    return res.status(201).json({
      message: "Travel package added successfully.",
      package: newPackage,
    });
  } catch (error) {
    console.error("❌ addPackages error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const fetchPackages = async (req, res) => {
  try {
    const findPackages = await TravelPackageModel.find().populate("hotels");

    if (findPackages.length === 0) {
      return res.status(404).json({ message: "No packages found" });
    }

    return res.status(200).json({
      message: "Packages fetched successfully",
      data: findPackages
    });

  } catch (error) {
    console.log("fetchPackages error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
