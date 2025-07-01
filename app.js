const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const { PORT = 3001 } = process.env;

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

// Middleware to parse JSON
app.use(express.json());

// Temporary middleware to add user to request (for testing)
app.use((req, res, next) => {
  req.user = {
    _id: "6863bbc8eb627a884f678c38", // _id of the test user
  };
  next();
});

// Use routes
app.use("/", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
