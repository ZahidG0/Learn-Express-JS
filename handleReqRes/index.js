const express = require('express');
const cookieParser = require('cookie-parser');

// Middleware to parse cookies
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Set Cookies in Response
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'john_doe', { httpOnly: true });
  res.send('Cookie has been set');
});

// Get Cookies from Request
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  console.log(username);
  if (username) {
    res.send(`Hello ${username}`);
  } else {
    res.send('No cookie found');
  }
}); 

// clear Cookies
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie has been cleared');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
