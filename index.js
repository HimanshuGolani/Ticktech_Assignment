const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

// Create an HTTP server
const server = http.createServer(app);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve the index page
app.get("/", (req, res) => {
  res.render("index");
});

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).render("404"); // Ensure you have a 404.ejs file in your views directory
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500"); // Ensure you have a 500.ejs file in your views directory
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
