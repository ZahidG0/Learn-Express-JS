const path = require("path");

// Ensure server/node_modules is on the module resolution path
process.env.NODE_PATH = path.join(__dirname, "node_modules");
require("module").Module._initPaths();

// Start the top-level index.js
require(path.join(__dirname, "..", "index.js"));

// simple guard to keep node alive if index.js starts a server
// (no-op)
