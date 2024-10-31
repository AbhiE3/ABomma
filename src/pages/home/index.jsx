import { useContext, useState } from "react"
import { MovieContext } from "../../context"
import MovieTile from "../../components/movieList";
import { Link } from "react-router-dom";

export default function HomePage() {

  const { listOfMovies, loading, pageNo, setPageNo } = useContext(MovieContext);


  if (loading) {
    return <h1 className="flex justify-center h-screen items-center">Fetching Movies...</h1>
  }

  function handleNextPage() {
    setPageNo((pageNo) => pageNo + 1);
    window.scrollTo(0, 190);
  }

  function handlePrevPage() {
    setPageNo((pageNo) => pageNo - 1);
    window.scrollTo(0, 190);
  }

  return (
    <section className="chakra-petch-regular items-center py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 style={{
              fontFamily: "Dancing Script, cursive",
              fontWeight: "normal",
              fontStyle: "normal",
            }} className="text-3xl font-light text-white-950 sm:text-4xl">
            Every time I watch a movie, it's magic, no matter what the movie's about.
          </h2>

        </div>
        <div className="grid grid-cols-2 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-4">
          {listOfMovies && listOfMovies.length > 0 ? (
            listOfMovies.map((single) => (
              <MovieTile key={single?.id} singleMovieTail={single} />
            ))
          ) : (
            <h3>No Products Found</h3>
          )}
        </div>
        <Link to='/home'>
          <div className="flex justify-between mx-center">
            <button onClick={handlePrevPage} className="mx-20 mt-10 bg-indigo-500 text-white rounded-lg">&larr;</button>
            <button onClick={handleNextPage} className="mx-20 mt-10 bg-indigo-500 text-white rounded-lg">&rarr;</button>
          </div>
        </Link>
      </div>
    </section>
  )
}