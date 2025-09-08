const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const multer = require('multer');
const fs = require('fs');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Show uploaded Images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('Images'), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// File delete endpoint
app.delete('/delete/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'File deletion failed' });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
