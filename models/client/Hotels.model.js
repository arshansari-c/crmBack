import mongoose, { Schema } from "mongoose";

const HotelSchema = new Schema({
  // Basic Info
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hotelimages : [{
    public_id : {
      type : String,
      required : true
    },
    url : {
      type : String,
      required : true
    }
  }],
  description: {
    type: String,
    trim: true,
  },
  stars: {
    type: Number,
    min: 1,
    max: 5,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Closed"],
    default: "Active",
  },

  // Location
  address: {
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    postalCode: { type: String },
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
    },
  },

  // Amenities
  amenities: [{
    type: String,
    enum: [
      "Free WiFi",
      "Swimming Pool",
      "Gym",
      "Restaurant",
      "Parking",
      "Spa",
      "Airport Shuttle",
      "Pet Friendly",
      "Room Service",
      "Conference Room"
    ]
  }],

  // Hotel Policies
  policies: {
    checkIn: { type: String },
    checkOut: { type: String },
    cancellation: { type: String },
    smokingAllowed: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
  },

  // Rooms
  rooms: [{
    roomType: {
      type: String,
      enum: ["Single", "Double", "Suite", "Deluxe", "Family", "Luxury"],
      required: true,
    },
    roomNumber: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    maxOccupancy: { type: Number, required: true },
    amenities: [String],
    available: { type: Boolean, default: true },
  }],
  // Contact Info
  contact: {
    phone: { type: String },
    email: { type: String },
    website: { type: String },
  },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Geospatial index for mapping or location search
HotelSchema.index({ "address.coordinates": "2dsphere" });

export default mongoose.model("Hotel", HotelSchema);
