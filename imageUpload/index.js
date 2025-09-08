// This is a simple Image Upload server using Express and Multer
require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer config
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post("/upload", upload.single("image"), async (req, res) => {
  console.log("Upload route hit");
  if (!req.file) {
    console.warn("No file in request");
    return res
      .status(400)
      .json({ status: "error", message: "No file uploaded." });
  }

  // Basic mime check
  if (!req.file.mimetype || !req.file.mimetype.startsWith("image/")) {
    // attempt to remove file
    if (req.file.path) await fs.promises.unlink(req.file.path).catch(() => {});
    return res
      .status(400)
      .json({ status: "error", message: "Uploaded file is not an image." });
  }

  try {
    console.log("Uploading to Cloudinary:", req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });
    // async delete
    await fs.promises
      .unlink(req.file.path)
      .catch((e) => console.warn("Could not delete local file", e.message));

    console.log("Upload successful:", result.secure_url);
    return res.json({
      status: "success",
      message: "File uploaded successfully.",
      file: result.secure_url,
    });
  } catch (error) {
    console.error(
      "Cloudinary upload error:",
      error && error.message ? error.message : error
    );
    // cleanup
    if (req.file && req.file.path)
      await fs.promises.unlink(req.file.path).catch(() => {});
    return res
      .status(500)
      .json({
        status: "error",
        message: "Cloudinary upload failed.",
        error: error && error.message ? error.message : String(error),
      });
  }
});

// Error handlers
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err.message);
    return res.status(400).json({ status: "error", message: err.message });
  }
  console.error("Server error:", err);
  res.status(500).json({ status: "error", message: "Internal server error" });
});

// Health route
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Image upload server' }));

// Start Server (default 5000 to avoid Vite's 5173)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
