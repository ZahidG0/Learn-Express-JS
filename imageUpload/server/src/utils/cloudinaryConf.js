const cloudinary = require("cloudinary").v2;
const path = require("path");

// load env from server/.env when running from project root
try {
  require("dotenv").config({ path: path.join(__dirname, "../../.env") });
} catch (e) {
  // ignore if dotenv not available; env may be set externally
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.warn(
    "Cloudinary credentials not set in env. Check server/.env or environment variables."
  );
}

module.exports = cloudinary;
