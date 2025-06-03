// Importing packages
const express = require("express");
const bodyParser = require("body-parser"); // If needed for URL-encoded data
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { isAuthorization } = require("./middlewares/authMiddleware");
require("colors");
// Initializing app
const app = express();

// Configurations
dotenv.config({ path: "backend/config/config.env" });

// Global Middleware
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For URL-encoded data, if needed
app.use(cookieParser());

// app.use(isAuthorization)

app.use(
  cors({
    origin: "*",
  })
);

// Error Handling for Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`.underline.bgRed);
  console.log(`Error : ${err.stack}`.underline.bgYellow);
  console.log(
    `Shutting Down the server due to uncaughtException`.underline.bgMagenta.bold
  );
  process.exit(1);
});

// Exporting app
module.exports = app;
