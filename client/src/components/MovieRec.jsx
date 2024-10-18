//  fetchRecommendation() => retrieves array of movie recommendation based on user’s selected genre
//  selectRandomMovie(movies) => takes the array of movies recommended and uses math.random to select and return a random single movie
//  displayMovie(movie) => renders the recommended movie’s data to the screen
import React from 'react'

export default function MovieRec({ movies }) {

  const selectRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  }

  const randomMovie = selectRandomMovie(movies);

  //console.log('Movies: ', movies);

  return (
    <div className="movie-rec">
      <h2>Movie Rec</h2>
      {/* doesn't load on page render but once rendered commented out section displays movie details of a random movie */}
      {/* <h3>{randomMovie.title} ({randomMovie.releaseYear})</h3>
      <p>{randomMovie.overview}</p> */}
    </div>
  )
}
