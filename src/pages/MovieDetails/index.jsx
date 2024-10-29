import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MovieContext } from "../../context";
import React from 'react';

const bgClasses = "bg-background text-foreground p-6 shadow-lg relative h-screen overflow-hidden";
const textClasses = "text-muted-foreground text-accent-foreground mt-9";
const buttonClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-lg";

export default function MovieDetails() {
  const { id } = useParams();
  const { aboutMovie, loading, favList, setFavList, setId } = useContext(MovieContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(id){
    setId(id);
    }
  }, [id, setId]);

  function handleFavPage() {
    setFavList([...favList, aboutMovie]);
  }

  if (loading) {
    return <h1 className="text-2xl text-center text-white">Fetching Data...</h1>;
  }

  if (!aboutMovie) {
    return <h1 className="text-2xl text-center text-white">Movie data not available</h1>;
  }

  const { backdrop_path, original_title, release_date, overview } = aboutMovie;

  return (
    <div className={bgClasses}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)),url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      ></div>

      <div className="flex items-end text-white relative z-0 h-full">
        <div>
          <h1 className="text-5xl font-bold">{original_title}</h1>
          <p className={textClasses}>
            {new Date(release_date).getFullYear()} | English | U/A 13+
          </p>

          <p className="mt-2 w-1/2">{overview}</p>
          <div className="mt-4">
            <span></span>
          </div>
          <div className="mt-6">
            <button onClick={handleFavPage} className={buttonClasses}>
              Add to Favourite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
