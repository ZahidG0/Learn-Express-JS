// This is a simple Image Upload server using Express and Multer
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer Upload
const upload = multer({ storage });

// Routes
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    // File uploaded successfully
    res.send({
        status: 'success',
        message: 'File uploaded successfully.',
        file: req.file
    });
});

// Start Server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
