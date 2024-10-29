import React, { useContext, useEffect } from 'react'
import { MovieContext } from '../../context'
import FavItem from '../../components/FavItem'

const cardClasses = 'p-4 bg-background rounded-lg shadow-md'
const titleClasses = 'flex text-2xl justify-center items-center font-bold mb-4'



const FavouritePage = () => {

  const {favList} = useContext(MovieContext)

  
  return (
    <div className={cardClasses}>
      <h1 className={titleClasses}><u>Preffered Movies</u></h1>
      {(favList && favList.length > 0 )?
       favList.map( single => <FavItem single={single} key={single.id}/>)
      :
      <p className='text-2xl flex justify-center h-screen items-center'>No favourites found</p>
      }
    </div>
  )
}


export default FavouritePage