import mysql from "mysql2/promise"
import dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})

/**
 * Establishes a connection to the MySQL database.
 * @returns {Promise<mysql.Connection>} The database connection instance.
 */

// const MYSQL_URL = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`
const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD, // Ensure correct env variable name
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQLPORT || 3306, // Default MySQL port
    });

    console.log(`✅ Database connected successfully! ${process.env.DB_USER}/${process.env.DB_HOST}/${process.env.DB_NAME}`);
    return connection;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
