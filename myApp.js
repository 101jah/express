require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const app = express();
const path = require("path");

// Define the absolute path to the assets folder
const publicPath = path.join(__dirname, "public");

// Middleware to serve static files from the /public directory
app.use("/public", express.static(publicPath));

// Route handler for the root path, rendering index.html from /views
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Route handler for a JSON response object
app.get("/json", (req, res) => {
  let message = "Hello json"; // Default message

  // Check if MESSAGE_STYLE is set and equals 'uppercase'
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  const responseObject = {
    message: message,
  };

  res.json(responseObject);
});

// Exporting the configured Express app
module.exports = app;
