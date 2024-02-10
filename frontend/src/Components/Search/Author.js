import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Author({author}) {
  return (
        <NavLink to={"/Author/"+author._id} className='flex flex-col gap-2 px-5 py-2 flex-grow border-b-2 border-black/50'>
          <span className='font-bold '>"{author.name}"</span>  
          <span className=' text-sm italic'>Country : <span className=' text-gray-600'>{author.Country}</span></span>  

        </NavLink>
  
  )
}
