require("dotenv").config(); // Load environment variables from .env file
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");

// Define the absolute path to the assets folder
const publicPath = path.join(__dirname, "public");

const addTimeMiddleware = (req, res, next) => {
  req.time = new Date().toString();
  next(); // Call next to move to the next middleware or route handler
};

app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

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

// Chain Middleware to Create a Time Server
app.get("/now", addTimeMiddleware, (req, res) => {
  //Remember to pass the request object as the first argument
  //Remember the response can be json or any form you want .
  res.json({ time: req.time });
});

// Route handler for GET /:word/echo
app.get("/:word/echo", (req, res) => {
  const { word } = req.params; // Extract the word parameter from req.params
  res.json({ echo: word }); // Respond with a JSON object { echo: word }
});

app.post("/name", (req, res) => {});
// Route handler for GET and POST /name
app
  .route("/name")
  .get((req, res) => {
    const { first, last } = req.query; // Extract first and last name from query parameters

    // Construct response JSON object
    const fullName = `${first} ${last}`;
    const responseObject = { name: fullName };

    res.json(responseObject); // Respond with JSON object { name: 'firstname lastname' }
  })
  .post((req, res) => {
    // Assuming JSON payload like { "first": "firstname", "last": "lastname" }
    const { first, last } = req.body; // Extract first and last name from JSON body

    // Construct response JSON object
    const fullName = `${first} ${last}`;
    const responseObject = { name: fullName };

    res.json(responseObject); // Respond with JSON object { name: 'firstname lastname' }

    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
  });

// Exporting the configured Express app
module.exports = app;
