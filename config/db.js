import mysql from "mysql2/promise"
import dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})

/**
 * Establishes a connection to the MySQL database.
 * @returns {Promise<mysql.Connection>} The database connection instance.
 */

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log(`✅ Database connected successfully! ${process.env.DB_USER}/${process.env.DB_HOST}/${process.env.DB_NAME}`);
    return connection;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
