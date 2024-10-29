import { useContext, useEffect } from "react";
import { MovieContext } from "../../context";
import { useNavigate } from "react-router-dom";

const imageClasses = 'object-cover w-36 h-52 transition-all duration-300 group-hover:scale-110 mr-5'
const buttonClasses = 'bg-destructive text-destructive-foreground hover:bg-destructive/80 ml-2 p-1 rounded'




export default function FavItem({ single }) {

  const navigate = useNavigate();
  const {favList,setFavList} = useContext(MovieContext);

  const handleRemove = () => {
    const updatedFavList = favList.filter(movie => movie.id !== single.id);
    setFavList(updatedFavList);
    window.alert(`${single.title} has been removed from favorites.`);
  }

  
  
  return (
    <>
    <div className="flex items-start mb-4 mt-10" onClick={()=>navigate(`/home/${single.id}`)}>
      <img aria-hidden="true" src={`https://image.tmdb.org/t/p/w500${single.poster_path}`} className={imageClasses}/>
      <div>
        <h2 className="text-3xl font-semibold">{single.title}</h2>
        <ul className="flex gap-2 my-5">
        {single.genres && single.genres.map((genre) => (
        <li key={genre.id}>{genre.name} |</li>
))}

        </ul>

        <div className="flex items-center mt-2">
          <button className={buttonClasses} onClick={()=>handleRemove()}>Remove</button>
        </div>
      </div>
    </div>
    <hr className="h-px my-8 bg-gray-700 border-0"/>
    </>
  )
}
