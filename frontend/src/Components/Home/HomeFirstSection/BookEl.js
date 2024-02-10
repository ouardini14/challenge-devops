import { StarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BookEl({book}) {
  return (
    <NavLink  to={"/Book/"+book._id} className='rounded-md flex items-center gap-3 max-w-fit px-5 py-5 transform transition-all duration-300 ease-in-out cursor-pointer hover:bg-white/20'>
        <img           src={process.env.PUBLIC_URL + book.CoverPic} alt="Cover" className="h-28 w-auto shadow-black shadow-md" />
        <div className="flex flex-col gap-4 max-w-2xl items-center lg:items-start">
          <h3 className="  font-bold text-sm  lg:max-w-[250px] 2xl:max-w-sm">{book.name}</h3>
          <div className="flex gap-5 text-sm "> 
            <div className="flex flex-row items-center justify-center">
              <StarIcon className="w-6 h-6 text-yellow-500" />
              {book.rating}
            </div>
            <div className="italic text-gray-500">
              Written By :
              <NavLink to={"/Author/"+book.author?._id} className={"max-w-fit text-white border-b-2"}>
                {book.author?.name}
              </NavLink>
            </div>
          </div>
          <p className="italic text-gray-500 text-xs ">{book.Summary}</p>
        </div>
    </NavLink>
  )
}
