import { addSchool, getAllSchools } from "../models/school.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Haversine formula for distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Add a school
const createSchool = asyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ success: false, message: "All fields are required" });
  }
  const result = await addSchool(name, address, latitude, longitude);
  if (!result.insertId) {
    return res.status(500).json({ success: false, message: "Failed to insert school" });
  }

  res.status(201).json(new ApiResponse(201, result.insertId, "School added successfully"));
});

// List schools sorted by proximity
const listSchools = asyncHandler(async (req, res) => {
  const { latitude, longitude } = req.query;
  const schools = await getAllSchools();

  schools.forEach((school) => {
    school.distance = calculateDistance(
      parseFloat(latitude),
      parseFloat(longitude),
      school.latitude,
      school.longitude
    );
  });

  schools.sort((a, b) => a.distance - b.distance);
  res.status(200).json(new ApiResponse(200, schools, "Schools listed successfully"));
});

export { createSchool, listSchools };
