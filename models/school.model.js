import connectDB from '../config/db.js'

/**
 * Inserts a new school into the database.
 * @param {string} name - School name.
 * @param {string} address - School address.
 * @param {number} latitude - Latitude coordinate.
 * @param {number} longitude - Longitude coordinate.
 * @returns {Promise<Object>} Inserted school data.
 */

const addSchool = async (name, address, latitude, longitude) => {
  const db = await connectDB();
  const query = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  const [result] = await db.execute(query, [name, address, latitude, longitude]);
  return result;
};

/**
 * Fetches all schools from the database.
 * @returns {Promise<Array>} List of schools.
 */
const getAllSchools = async () => {
  const db = await connectDB();
  const [results] = await db.execute("SELECT * FROM schools");
  return results;
};

export { addSchool, getAllSchools };
