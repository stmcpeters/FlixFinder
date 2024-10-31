import React from 'react'
import { useState, useEffect } from 'react';

export default function MovieRec({ movies }) {

  //  fetchRecommendation() => retrieves array of movie recommendation based on user’s selected genre
//  selectRandomMovie(movies) => takes the array of movies recommended and uses math.random to select and return a random single movie
//  displayMovie(movie) => renders the recommended movie’s data to the screen

  const [randomMovie, setRandomMovie] = useState(null);

  const selectRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
  }

  // useEffect is activated every time the movies array changes, checking that movies have loaded. once the movies array is loaded, selectRandomMovie() is called and updates and sets the state of randomMovie to 1 random movie chosen out of the movies array
  useEffect(() => {
    if(movies.length > 0) {
      setRandomMovie(selectRandomMovie(movies));
      }
    }, [movies]);

    // console.log(randomMovie);

  // if movies array has not loaded, loading message will be shown
  if(!movies.length) {
    return <p>Loading...</p>
  }

  return (
    <div className="movie-rec">
      <h2>Movie Recommendation</h2>
      {/* conditionally shows movie details only if randomMovie has been set (is truthy) */}
      {randomMovie && (
        <>
          <h3>{randomMovie.title} ({randomMovie.releaseYear})</h3>
          <img src={randomMovie.imageSet.horizontalPoster.w480} alt={randomMovie.title} /> <br/>
          <h4>Summary:</h4>
          <p>{randomMovie.overview}</p>
          <p>Genres: {randomMovie.genres[0].name}</p>
          <p>Runtime: {randomMovie.runtime}min</p>
          <h4>Streaming Options</h4>
          <ul>
              {randomMovie.streamingOptions.us.map((option, index) => (
                <li key={index}>
                  Type: {option.type} <br />
                  Service: {option.service.name} <br />
                  {/* Price: {option.price.formatted} <br />  */}
                  Link: <a href={option.link} target="_blank">Watch Here</a>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  )
}
