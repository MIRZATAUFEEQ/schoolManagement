import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database Connected Successfully!");
    connection.release();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

export { pool, connectDB };