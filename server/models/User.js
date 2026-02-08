import mongoose from "mongoose";    


// Defining the User schema with validation and settings to ensure data integrity and security
const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Automatically converts email to lowercase
      trim: true,      // Removes white spaces from both ends
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Only allows these two values
      default: "user",
    },
    selectedLanguages: {
      type: [String], // An array of strings
      default: [],
    },
  },
  { 
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
    strict: "throw"   // Throws an error if unknown fields are added to the document
  }
);

// Exporting the model using CommonJS syntax
module.exports = mongoose.model("User", userSchema);