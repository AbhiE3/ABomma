import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { MovieContext } from "../../context";

export default function MovieTile({singleMovieTail}){


  const {setId } = useContext(MovieContext);

  const navigate = useNavigate();

  function handleDetailsPage(getId){
  navigate(`/home/${getId}`)
  }
  
  function handleFavPage(){
    setId(singleMovieTail.id)
  }

  return(
    <div className="relative group shadow-2xl border border-white-700 p-6 cursor-pointer rounded-lg">
      <div className="overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${singleMovieTail.poster_path}`}
          alt={singleMovieTail?.title}
          className="oject-cover w-full h-full transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-white-900 sm:text-sm text-xs md:text-base">
          <p className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
            {singleMovieTail?.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-white-900 sm:text-sm md:text-[14px]">
            rating:{singleMovieTail?.vote_average}
          </p>
        </div>
      </div>
      <div className="flex justify-between ">
      <button onClick={()=>handleDetailsPage(singleMovieTail?.id)}
        className="px-5 mt-5 w-50 py-2 rounded-bl-xl rounded-tr-xl bg-black text-white font-bold text-lg m-2 bg-gradient-to-r from-indigo-500 to-blue-400"
      >
        About
      </button>
      <button onClick={()=>handleFavPage()}
        className=" px-5 mt-5 w-50 py-1 rounded-bl-xl rounded-tr-xl bg-black text-white font-bold text-lg m-2 bg-gradient-to-r from-indigo-500 to-blue-400"
      >
        Favourite
      </button>
      </div>
    </div>
  )
}