import { BookOpenIcon, StarIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React from "react";
import { NavLink } from "react-router-dom";

export default function SlideEl({ book }) {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1,
                   transition: {
                    ease: "easeInOut",
                     delay: 1.8
    }}}
    viewport={{ once: true }} 
    className="px-10 py-10 bg-gradient-to-t from-black via-black  ">
      <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start">
        <img
          src={book.CoverPic}
          alt="Cover"
          className="h-44 w-auto "
        />
        <NavLink to={"/Book/"+book._id} className={"max-w-fit hover:scale-105 max-h-fit"}>
          <BookOpenIcon className="w-24 h-24 text-cyan-800" />
        </NavLink>

        <div className="flex flex-col gap-4 max-w-2xl items-center lg:items-start text-center lg:text-start">
          <h3 className="text-xl lg:text-4xl font-bold ">{book.name}</h3>
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
          <p className="italic text-gray-500 text-xs  max-w-2xl">{book.Summary}</p>
        </div>

      </div>
    </motion.div>
  );
}
