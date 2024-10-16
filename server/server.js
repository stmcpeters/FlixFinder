const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// initial endpoint
app.get('/', (req, res) => {
  res.json('hi from your server :D');
});

// fetching all genres from genres table
app.get('/db/genres', async (req, res) => {
  try {
    const { rows: genres } = await db.query('SELECT * FROM genres');
    res.send(genres);
  } catch (error){
    console.error('Error fetching from genres table: ', error);
  }
})

// fetches all users from user table
app.get('/db/users', async (req, res) => {
  try {
    const { rows : users } = await db.query('SELECT * FROM users');
    res.send(users);
  } catch (error) {
    console.error('Error fetching users from users table: ', error);
  }
})

// fetches all reviews from reviews table
app.get('/db/reviews', async (req, res) => {
  try {
    const { rows: reviews } = await db.query('SELECT * FROM reviews');
    res.send(reviews);
  } catch (error) {
    console.error('Error fetching reviews from the reviews table: ', error);
  }
})

// fetches user-genres joined table
app.get('/db/joined', async (req, res) => {
  try {
    const { rows: userGenres } = await db.query('SELECT * FROM user_genres');
    res.send(userGenres);
  } catch (error) {
    console.error('Error fetching from user-genre table: ', error);
  }
})

// fetches popular/recent movies
  app.get('/movies', async (req, res) => {
    try {
      const response = await fetch("https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&series_granularity=show&order_direction=desc&order_by=original_title&show_original_language=en&output_language=en",{
        headers: {
          'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
        }
    });
      const data = await response.json();
      res.send(data);
    } catch (error) {
      console.error('Error fetching movies from API: ', error);
    }
  })


// server is listening on PORT
app.listen(PORT, () => {
  console.log(`hi :D your server is on http://localhost:${PORT}`);
});