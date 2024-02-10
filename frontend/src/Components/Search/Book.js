import { StarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { books } from '../../constants'

export default function Book({book}) {
  return (
    <NavLink to={"/Book/"+book._id} className="transform transition-all duration-500 ease-in-out group hover:bg-slate-200/70  px-5 py-2 flex items-start justify-around md:justify-start text-left z-10  border-b-2 border-black/50 ">
        <img src={book.CoverPic} alt="Cover" className=' w-12 h-20 md:w-16 md:h-24 ' />
        <div className='flex flex-col px-3 w-full h-full'>
          <span className='font-bold '>"{book.name}"</span>  
          <span className=' text-sm italic'>By : <span className=' text-gray-600'>{book.author.name}</span></span>  
          <div className='  self-end  justify-end text-sm italic text-gray-600 group-hover:text-slate-900  gap-3 transform transition-all duration-500 ease-in-out'>   
          <div className='flex gap-2'>  
         { book.rating   &&    <span className='flex items-center justify-center font-bold   '>
                 {book.rating}
                <StarIcon className="w-4 h-4 " />
              </span>}
          {new Date(book.PublishDate).toLocaleDateString('en-Us', {  year: 'numeric'})}
          </div> </div>
   

        </div>
    </NavLink>
  )
}
