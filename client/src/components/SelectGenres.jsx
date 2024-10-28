import React, { useState, useEffect } from 'react'
import Select from 'react-select'

export default function SelectGenres({ genres }) {

  const [availableGenres, setAvailableGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  //console.log(genres);

// toggleGenre() => adds or removes genres from the selectedGenres
  // post request to user-genre table to add favorite genres 



  // put request to user-genre table to edit favorite genres


// fetchGenres() => initial data fetch of available genres on page load
  // fetches genres from genre table and saves to availableGenre state
  // map over each genre to sort value and label (to populate select)
  
  useEffect(() => {

    const fetchGenres = async () => {
      try {
        // connecting to genres table in DB
        const response = await fetch('http://localhost:5001/db/genres');

        // error handling if cannot connect to DB
        if(!response.ok) throw new Error('Network response is not ok </3');

        // parse response data to json format
        const data = await response.json();
        // maps over data from genre table to fit select option element format
        const genreData = data.map(genre => ({
          value: genre.genre_id,
          label: genre.genre_name
        }))
        // sets genre data to availableGenres
        setAvailableGenres(genreData);
        // catches and displays errors fetching data
      } catch(error) {
        console.error('Error fetching genres: ', error);
      }
    }
// genres will be fetched on mount (aka page load)
    fetchGenres();
  }, []);

    // check if genre data from DB is getting fetched correctly
    // console.log(availableGenres);



  const handleGenreSelect = (genres) => {
    setSelectedGenres(genres);
  }


// handle change/updating options to set as selected
  // event.target.value

// saveGenres() => prevents button from being submitted 
    // triggers either post or put requests using user as prop
    // save options to selected genres



  return (
    <>
      <h2>What kind of mood are you in?</h2>
      <div className="select-genre">
        {/* populates options with genres from DB */}
        {/* displays options and handle changes */}
        <Select options={availableGenres} isMulti/>

        {/* button will save selected genres and fetch movies matching those genres */}
        <button type="button">Generate Movie</button>
      </div>
    </>
  )
}
