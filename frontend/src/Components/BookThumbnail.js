import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { StarIcon,HeartIcon, BookmarkSlashIcon, BookmarkIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux'
import { useAddToLibraryMutation, useRemoveFromLibraryMutation } from '../Services/User.Service'
import { motion } from 'framer-motion'

export default function BookThumbnail({book,found,logged}) {
  const [addBook, AddResponse ] = useAddToLibraryMutation()
  const [removeBook,  DeleteResponse] = useRemoveFromLibraryMutation()


  const navigate=useNavigate()



  return (
    <div className=" bg-gray-900 rounded-sm group  w-[150px] lg:w-[190px] xl:w-[210px]">
      <div className="relative h-[195px] w-[150px] lg:h-[240px] lg:w-[190px] xl:h-[270px] xl:w-[210px]">
        <img
          src={process.env.PUBLIC_URL + book.CoverPic}
          alt="Cover"
          className="   h-full w-full shadow-black shadow-md hover:blur-sm hover:shadow-xl hover:shadow-cyan-900 hover:scale-[1.01] transform transition-all duration-500 ease-in-out"
        />
        {found ? 
          <button
            onClick={() => {
              removeBook(book._id)
            }}
            className=" absolute bottom-3 right-3 rounded-full text-red-700 bg-white p-2 hover:scale-125 transform transition-all duration-500 ease-in-out"
          >
            <BookmarkSlashIcon className="w-6 h-6 " />
          </button>
        
       :
          <button
            onClick={() => {
              (!found && logged )? addBook(book._id) : navigate("/SignIn")
            }}
            className=" absolute bottom-3 right-3 rounded-full text-cyan-700 bg-white p-2 hover:scale-125 transform transition-all duration-500 ease-in-out"
          >
            <BookmarkIcon className="w-6 h-6 " />
          </button>

        }
      </div>

      <div className="px-3 py-4 flex flex-col gap-3 ">
        <div className="flex gap-3 text-xs items-center">
          <div className="flex items-center justify-center font-bold ">
            <StarIcon className="w-6 h-6 text-yellow-500" />
            {book.rating}
          </div>

          <div className="text-gray-500 s">
            {new Date(book.PublishDate).toLocaleDateString("en-Us", {
              year: "numeric",
            })}
          </div>
        </div>
        <h3 className="font-semibold text-xs truncate">{book.name}</h3>
        <NavLink
          to={"/Book/" + book._id}
          className={
            " px-3 py-2 text-xs  text-center rounded-lg bg-black/25 text-gray-500 hover:scale-105  hover:text-white  transform transition-all duration-500 ease-in-out"
          }
        >
          Read Now
        </NavLink>
      </div>
    </div>
  );
}
