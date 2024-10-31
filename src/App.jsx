import { Navbar, Typography } from '@material-tailwind/react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/home';
import FavouritePage from './pages/favourite';
import StartPage from './pages/start';
import MovieDetails from './pages/MovieDetails';
import { useContext } from 'react';
import { MovieContext } from './context';
import HNotification from './components/Notification';

function App() {
  const { searchMovie, setSearchMovie, searchResult, setSearchResult,setPageNo} = useContext(MovieContext);

  const navigate = useNavigate();

  async function handleSearch(event) {
    const query = event.target.value;
    setSearchMovie(query);

    if (!query) {
      setSearchResult([]);
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZWZlMTI2ZDY3NzcyYWM1MjFiMWU0OWRkNDlmNDhmZSIsIm5iZiI6MTcyNjQwMzU2NC45MTkzODQsInN1YiI6IjY2ZTZkMjlmZGQyMjRkMWEzOTkxNTNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ojeNNXt_ywqYfZiDrf_wnYIiXNSe8M62nPH2vsy3VMQ'
      }
    };

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
      const result = await response.json();
      if (result) {
        setSearchResult(result.results.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  }

  function handleSuggestion(id) {
    navigate(`/home/${id}`);
    handleClear();
  }

  function handleClear() {
    setSearchMovie('');
    setSearchResult([]);
  }

  return (
    <>
      <Navbar variant='gradient' className='chakra-petch-regular mx-auto bg-indigo-500 max-w-screen-l px-4 py-2 lg:px-8 lg:py-4'>
        <div className='flex flex-wrap items-center justify-between gap-y-4 text-white'>
          <Typography variant="h1" className="chakra-petch-bold ml-0 py-2.5">
            📽️  ABomma.
          </Typography>
          <div className="ml-auto flex gap-4 md:mr-4">
            <ul className='ml-auto flex gap-4 md:mr-4 py-2'>
              <li>
                <Link onClick={()=>setPageNo(1)} to='/home'>Home</Link>
              </li>
              <li>
                <Link to={'/favourite'}>Favourites</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
            </ul>
            <div className="relative flex w-full">
              <input
                type="search"
                value={searchMovie}
                className="w-full rounded-l-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Search for movies..."
                onChange={handleSearch}
              />
              <button type="submit" className="bg-indigo-600 px-6 text-white font-extrabold rounded-r-lg hover:bg-indigo-750 active:bg-indigo-400">
                Go
              </button>

              {searchResult.length > 0 && (
                <ul className="absolute left-0 right-0 mt-10 bg-white text-black border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                  {searchResult.map((movie, index) => (
                    <li
                      key={movie.id || index}
                      className="px-4 py-2 hover:bg-indigo-100 cursor-pointer transition"
                      onClick={() => handleSuggestion(movie.id)}
                    >
                      {movie.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            

            <button
              className="bg-white text-black font-extrabold rounded-md px-4 py-2 "
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </Navbar >
      <HNotification />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/favourite' element={<FavouritePage />} />
        <Route path='/home/:id' element={<MovieDetails />} />
        <Route path='/*' element={<StartPage />} />
      </Routes>
      <p className='chakra-petch-regular text-center pt-5'>&copy; 2024 ABHI</p>
    </>
  );
}

export default App;
