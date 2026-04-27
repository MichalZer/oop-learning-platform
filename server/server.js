import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";

// Resolve __dirname in ESM mode
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDistPath = path.resolve(__dirname, "../client/dist");
const clientBuildPath = path.resolve(__dirname, "../client/build");
const frontendPath = fs.existsSync(clientDistPath)
  ? clientDistPath
  : clientBuildPath;

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.warn(
    `Frontend build directory not found. Static files are disabled. Checked: ${clientDistPath} and ${clientBuildPath}`
  );
}

// Define the port number from environment variables or use 5000 as a fallback
const PORT = process.env.PORT || 5000;

/**
 * Starts the Express server and listens for incoming connections.
 * Bind to 0.0.0.0 so Render can route external traffic into the container.
 */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});