
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        
        // Attempt to connect using the URI stored in environment variables
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch(err) {
        // Log the specific error message if the connection fails
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};
    