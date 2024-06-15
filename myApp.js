let express = require("express");
let app = express();
const port = 3000; // or any port number you prefer
const path = require("path");

home = __dirname + '/relativePath/file.ext'

// Define a route handler for the absolute path
 app.get("/",req,res) {
  res.sendFile(home);
  };
module.exports = app;
