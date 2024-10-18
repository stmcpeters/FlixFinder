import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar.jsx'
import UserAuth from './components/UserAuth.jsx'
import SelectGenres from './components/SelectGenres.jsx'
import MovieRec from './components/MovieRec.jsx'
import MovieReview from './components/MovieReview.jsx'

function App() {
  const [count, setCount] = useState(0)
  // initialize and update users state
  const [users, setUsers] = useState([]);
  // initialize and update genres state
  const [genres, setGenres] = useState([]);
  // initialize and update reviews state
  const [reviews, setReviews] = useState([]);
  // initialize and update movies state
  const [movies, setMovies] = useState([]);

  // fetching users from database
  const loadUsers = async () => {
    try {
      const response = await fetch("http://localhost:5001/db/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }

  // fetches users from database on page render
  useEffect(() => {
    loadUsers();
  }, []);


  // fetches genres from database
  const loadGenres = async () => {
    try {
      const response = await fetch("http://localhost:5001/db/genres");

      //  error handling
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Error fetching genres: ', error);
    }
  }

  // fetches genres from database on page render
  useEffect(() => {
    loadGenres();
  }, []);

  // fetches reviews from database
  const loadReviews = async () => {
    try {
      const response = await fetch("http://localhost:5001/db/reviews");
      // console.log(response);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
    }
  }

    // fetches reviews from database on page render
    useEffect(() => {
      loadReviews();
    }, []);

  // fetches recent/popular movies from API
  const loadMovies = async () => {
    try {
      const response = await fetch("http://localhost:5001/movies");
      // console.log(response);
      const data = await response.json();
      setMovies(data.shows);
    } catch (error) {
      console.error('Error fetching movies: ', error);
    }
  }

    // fetches movies from API on page render
    useEffect(() => {
      loadMovies();
    }, []);

// console.log(reviews);
// console.log(movies);
// console.log(users);

  return (
    <>
      <NavBar />
      <UserAuth />
      {/* was going to send genres prop but hardcoded data instead */}
      <SelectGenres />
      <MovieRec movies={movies} />
      <MovieReview reviews={reviews} />
    </>
  )
}

export default App
