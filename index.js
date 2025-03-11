import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config(); // Load environment variables

// Connect to Database
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    });

// Global Error Handler
process.on("uncaughtException", (err) => {
    console.error("🔥 Uncaught Exception! Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
});