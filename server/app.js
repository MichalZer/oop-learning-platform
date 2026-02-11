import express from "express";
import cors from "cors";
import "dotenv/config"; 
import { connectDB } from "./config/db.js"; 
import authRoutes from "./routes/auth.routes.js";
import topicRoutes from "./routes/Topic.route.js";
import ProgressRoutes from "./routes/Progress.routes.js";

const app = express();

// Initialize the database connection
connectDB();

// Middleware
app.use(cors()); // Allows the frontend to communicate with the backend
app.use(express.json()); // Parses incoming JSON requests

// Routes
// All routes inside authRoutes will be prefixed with /api
app.use("/api/auth", authRoutes);
app.use("/api", topicRoutes);
app.use("/api", ProgressRoutes);


// Export the app instance for use in server.js (or for testing)
export default app;