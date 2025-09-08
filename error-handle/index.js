const express = require("express");
const CustomError = require("./middleware/customError");
const errorHandler = require("./middleware/errorHandle");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* app.get("/", (req, res, next) => {
  try {
    // Simulate an error
    throw new Error("Something went wrong!");
  } catch (error) {
    next(error);
  }
}); */

// Custom error route
app.get("/custom-error", (req, res, next) => {
  const error = new CustomError("This is a custom error message", 400);
  next(error);
});

// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
