import app from "./app.js"; 

// Define the port number from environment variables or use 5000 as a fallback
const PORT = process.env.PORT || 5000;

/**
 * Starts the Express server and listens for incoming connections.
 * This is the final step to get the backend running.
 */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});