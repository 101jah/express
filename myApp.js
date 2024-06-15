let express = require("express");
let app = express();
const port = 3000; // or any port number you prefer
const path = require("path");

const absolutePath = "/views/index.html";
const home = path.join(__dirname, absolutePath);

// Define a route handler for the root path '/'
app.get("/", (req, res) => {
  res.send("home");
});

module.exports = app;
