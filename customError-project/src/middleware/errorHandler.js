// Error handler middleware
const CustomError = require("../utils/customError");
const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    logger.error(`CustomError: ${err.message}`);
    logger.error(err.stack);
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
      status: err.statusCode || 400,
      error: {
        type: "CustomError",
        field: "email",
      },
      timestamp: new Date().toISOString(),
    });
  }

  logger.error(`Unhandled Error: ${err.message}`);
  logger.error(err.stack);
  return res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
