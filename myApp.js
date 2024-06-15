let express = require("express");
let app = express();
const port = 3000; // or any port number you prefer
const path = require("path");

home = __dirname + "views/index.html";

// Define a route handler for the absolute pathably
app.get("/", (req, res) => {
  res.sendFile(home);
});
module.exports = app;
