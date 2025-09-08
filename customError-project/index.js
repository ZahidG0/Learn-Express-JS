const express = require("express");

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const errorHandler = require("./src/middleware/errorHandler");
const CustomError = require("./src/utils/customError");
const logger = require("./src/utils/logger");

// Sample route to demonstrate error handling
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error message route that demonstrates different types of error responses
app.get("/error-messages", (req, res, next) => {
  try {
    // Simulate error
    throw new CustomError("This is a custom error message", 405);

  } catch (error) {
    next(error);
  }
});

// Not found route to handle 404 errors
app.get("/error", (req, res) => {
  const error = new CustomError("Route not found", 404);
  throw error;
});

app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
