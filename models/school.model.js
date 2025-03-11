import { pool } from "../config/db.js";

// Insert a new school
const addSchool = async (name, address, latitude, longitude) => {
  const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  const [result] = await pool.execute(query, [name, address, latitude, longitude]);
  return result;
};

// Fetch all schools
const getAllSchools = async () => {
  const [results] = await pool.execute("SELECT * FROM schools");
  return results;
};

export { addSchool, getAllSchools };
