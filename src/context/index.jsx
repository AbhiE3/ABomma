import { createContext, useEffect, useState } from "react";

export const MovieContext = createContext(null);

export default function MovieState({ children }) {
  const [listOfMovies, setListOfMovies] = useState([]);
  const [aboutMovie, setAboutMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [searchMovie, setSearchMovie] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [favList, setFavList] = useState([]);
  const [notification, setNotification] = useState("");
  const [pendingFavoriteId, setPendingFavoriteId] = useState(null);

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => setNotification(""), 5000);
  }

  useEffect(() => {
    setNotification("");
  }, []);
  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWZlMTI2ZDY3NzcyYWM1MjFiMWU0OWRkNDlmNDhmZSIsIm5iZiI6MTcyNjQwMzU2NC45MTkzODQsInN1YiI6IjY2ZTZkMjlmZGQyMjRkMWEzOTkxNTNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ojeNNXt_ywqYfZiDrf_wnYIiXNSe8M62nPH2vsy3VMQ'
    }
  };

  async function fetchaboutMovie() {
    if (!id) return;
    try {
      
      const apiResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
      const result = await apiResponse.json();

      if (result) {
        setAboutMovie(result);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching movie details:", error);
    }
  }

  async function fetchListOfMovies() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${pageNo}&sort_by=revenue.desc`, options);
      const result = await response.json();

      if (result && result.results) {
        setListOfMovies(result.results);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error fetching movie list:", error);
    }
  }

  useEffect(()=>{
    setNotification("");
  },[id])

  useEffect(() => {
    fetchListOfMovies();
  }, [pageNo]);

  useEffect(() => {
    fetchaboutMovie();
  }, [id]);

  useEffect(() => {

    if (pendingFavoriteId && aboutMovie && aboutMovie.id === pendingFavoriteId) {
      setFavList((prevList) => [...prevList, aboutMovie]);
      showNotification("Added to favorites...!");
      setPendingFavoriteId(null);
    }
  }, [aboutMovie, pendingFavoriteId]);

  return (
    <MovieContext.Provider value={{ 
      listOfMovies, loading, setLoading, pageNo, setPageNo, aboutMovie, setAboutMovie, 
      searchMovie, setSearchMovie, searchResult, setSearchResult, favList, setFavList, id, setId, 
      showNotification, notification, setPendingFavoriteId
    }}>
      {children}
    </MovieContext.Provider>
  );
}
