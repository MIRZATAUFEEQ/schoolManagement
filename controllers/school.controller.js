import { addSchool, getAllSchools } from "../models/school.model.js"
import { asyncHandler } from '../utils/asyncHandler.js'

import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * Calculates the geographical distance between two coordinates using Haversine formula.
 * @param {number} lat1 - Latitude of point 1.
 * @param {number} lon1 - Longitude of point 1.
 * @param {number} lat2 - Latitude of point 2.
 * @param {number} lon2 - Longitude of point 2.
 * @returns {number} Distance in kilometers.
 */
// Haversine formula for distance calculation
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Add a school
const createSchool = asyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  const result = await addSchool(name, address, latitude, longitude);
  res.status(201)
    .json(
      new ApiResponse(200, "School added successfully", result.insertId)
    );
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
  res.status(201)
    .json(
      new ApiResponse(200, 'school listed successfully', schools)
    )
});

export { createSchool, listSchools };
