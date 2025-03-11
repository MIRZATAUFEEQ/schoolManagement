import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./routes/school.route.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json()); // Fix missing middleware
app.use(bodyParser.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/schools", router);

// Error Handling Middleware
app.use(errorHandler);

export { app };