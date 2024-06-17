const express = require("express");
const app = express();
const path = require("path"); //allow path
require("dotenv").config(); // adding .env files for api keys and more

// Define the absolute path to the assets folder
const publicPath = path.join(__dirname, "public");

// Middleware to serve static files from the /public directory
app.use("/public", express.static(publicPath));

// Route handler for the root path, rendering index.html from /views
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//Route handler for a json response object
app.get("/json", (req, res) => {
  let responseObject = {
    message: "Hello json",
  };

  // Checking if the response is a uppercase
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json(responseObject.message);
});

// Exporting the configured Express app
module.exports = app;
