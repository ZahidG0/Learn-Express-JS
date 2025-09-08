const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// User API Endpoints
app.get('/api/profile', (req, res) => {
    const userID = [
        {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
        city: 'New York',
        country: 'USA',
        occupation: 'Software Engineer',
        hobbies: ['Reading', 'Coding', 'Traveling'],
        favoriteBooks: ['The Great Gatsby', 'To Kill a Mockingbird', '1984'],
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        age: 28,
        city: 'Los Angeles',
        country: 'USA',
        occupation: 'Data Scientist',
        hobbies: ['Cooking', 'Hiking', 'Photography'],
        favoriteBooks: ['Pride and Prejudice', 'The Catcher in the Rye', 'The Alchemist'],
    },
    {
        id: 3,
        name: 'GuRu',
        email: 'guru@example.com',
        age: 25,
        city: 'San Francisco',
        country: 'USA',
        occupation: 'Product Manager',
        hobbies: ['Gaming', 'Biking', 'Cooking'],
        favoriteBooks: ['The Lean Startup', 'Sapiens', 'The Art of War'],
    }

    ];
  res.json(userID);
});

// Set Cookies
app.get('/api/setcookie', (req, res) => {
  res.cookie('username', 'JohnDoe', { maxAge: 900000, httpOnly: true });
  res.send('Cookie has been set');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
