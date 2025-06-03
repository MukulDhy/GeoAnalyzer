// Importing modules
const app = require("./app");
const connectionMongoDb = require("./database/connDataBase");
const userRoutes = require("./routes/userRoutes.js");
const imageRoutes = require("./routes/imageRoutes");
const mlRoutes = require("./routes/machineLearningRoutes");
const errorMiddleWare = require("./middlewares/errorHandling");
require("colors");
const PORT = process.env.PORT || 6969;
// Database Connection
connectionMongoDb();
// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/image", imageRoutes);
app.use("/api/v1/ml", mlRoutes);

// Error Handling Middleware
app.use(errorMiddleWare);

// Server Initialization
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server is working on http://localhost:${process.env.PORT}`.underline
      .bgGreen
  );
});

// Handling Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`.underline.bgRed);
  console.log(
    `Shutting down the server due to unhandled promise rejection`.underline
      .bgMagenta.bold
  );
  process.exit(1);
});
