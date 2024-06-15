let express = require("express");
let app = express();
const port = 3000; // or any port number you prefer

// Define a route handler for the root path '/'
app.get("/", (req, res) => {
  res.send("Hello Express");
});

module.exports = app;
