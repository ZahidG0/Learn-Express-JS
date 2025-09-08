const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World! This is the root route.");
});

// Middleware function to log request details
const requestLogger = (req, res, next) => {
  console.log("Middleware is Executed:");
  next();
};

// Activate middleware for specific route
const activateMiddleware = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`Request Time: ${time}`);
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Method: ${req.method}`);
  console.log("Middleware is Activated:");
  next();
};

app.use(activateMiddleware)

app.get("/products", requestLogger, (req, res) => {
  res.send("This is the products Page.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
