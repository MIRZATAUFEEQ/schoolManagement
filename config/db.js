import mysql from "mysql2/promise"
import dotenv from 'dotenv'
dotenv.config({
  path: './.env'
})

/**
 * Establishes a connection to the MySQL database.
 * @returns {Promise<mysql.Connection>} The database connection instance.
 */

const MYSQL_URL = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3306/${process.env.MYSQL_DATABASE}`

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      MYSQL_URL,
    });

    console.log(`✅ Database connected successfully! ${process.env.DB_USER}/${process.env.DB_HOST}/${process.env.DB_NAME}`);
    return connection;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
