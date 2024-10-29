import { createContext, useEffect, useState } from "react";

export const MovieContext = createContext(null);


export default function MovieState({ children }) {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [aboutMovie, setAboutMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [searchMovie, setSearchMovie] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [favList, setFavList] = useState([]);


  async function fetchaboutMovie() {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWZlMTI2ZDY3NzcyYWM1MjFiMWU0OWRkNDlmNDhmZSIsIm5iZiI6MTcyNjU3NjAyMS4yNTQ4MSwic3ViIjoiNjZlNmQyOWZkZDIyNGQxYTM5OTE1M2JjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7lT9dsfEss3aUKAFTFDAMZaAw-kGj4Ee20bfV-fn3vg'
        }
      };
      const apiResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
      const result = await apiResponse.json();
      console.log(result);

      if (result) {
        setAboutMovie(result);
        setLoading(false);
      }
    }
    catch (error) {
      console.log("Error happened....");

    }
  }



  async function fetchListOfMovies() {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWZlMTI2ZDY3NzcyYWM1MjFiMWU0OWRkNDlmNDhmZSIsIm5iZiI6MTcyNjQwMzU2NC45MTkzODQsInN1YiI6IjY2ZTZkMjlmZGQyMjRkMWEzOTkxNTNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ojeNNXt_ywqYfZiDrf_wnYIiXNSe8M62nPH2vsy3VMQ'
        }
      };
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${pageNo}&sort_by=revenue.desc`, options)
      const result = await response.json();

      if (result && result?.results) {
        setListOfMovies(result?.results);
        setLoading(false);
      }
    }
    catch (error) {
      console.log("error");

    }
  }

  useEffect(() => {
    fetchListOfMovies();
    fetchaboutMovie();
  }, [pageNo, id])

  useEffect(() => {
    if (aboutMovie && aboutMovie.id && !favList.some(movie => movie.id === aboutMovie.id)) {
      setFavList([...favList, aboutMovie]);
      window.alert('Added successfully');
    } else if (aboutMovie.id) {
      window.alert('Already exists...');
    }
  }, [aboutMovie]);


  return (
    <MovieContext.Provider value={{ listOfMovies, loading, setLoading, pageNo, setPageNo, aboutMovie, setAboutMovie, searchMovie, setSearchMovie, searchResult, setSearchResult, favList, setFavList, id, setId }}>{children}</MovieContext.Provider>
  )
}