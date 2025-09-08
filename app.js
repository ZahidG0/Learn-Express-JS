const express = require('express')
const app = express()
const port = process.env.PORT || 3000


// ejs Configuration
app.set('view engine', 'ejs');
app.set('views', './views');

// middleware to parse JSON bodies
app.use(express.json());


// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Home', heading: 'Welcome to EJS', message: 'Hello World! Just Waiting for me to be deployed on Heroku' });
})

// About route
app.get('/about', (req, res) => {
    res.send('This is the about page')
  })

// Routes for contact page
app.use('/api', require('./src/routes/contact.routes'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
