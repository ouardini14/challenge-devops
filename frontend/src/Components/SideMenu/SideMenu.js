import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
  HomeIcon,
  BookOpenIcon,
  StarIcon,
  FireIcon,
  CalendarDaysIcon,
  RectangleStackIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useLocation } from "react-router-dom";
import { genres } from "../../constants";

export default function SideMenu(props) {
  const path = useLocation();
  const [userInfo, setuserInfo] = useState(props.userInfo ? props.userInfo :null)
  useEffect(() => {
    if(props.SideMenuOpen){
      props.CloseMenu()
    }
  
  
  }, [path.pathname])
  useEffect(() => {
    setuserInfo(props.userInfo ? props.userInfo :null)
  
  
  }, [props.userInfo])
  return (
    <>
      <a
        onClick={() => props.CloseMenu()}
        id="SideMenuBg"
        className="fixed hidden justify-start  z-[99999] bg-black/50 backdrop-blur-sm top-0  left-0  h-screen w-screen text-white"
      ></a>
      <div
        id="SideMenu"
        className="min-h-screen fixed  top-0  -left-[100vw]   md:-left-[45vw] lg:-left-[30vw]    z-[99999] max-h-screen overflow-y-scroll  scrollbar-thumb-gray-900 scrollbar-thin w-screen md:w-[45vw] lg:w-[30vw]  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black  "
      >
        <div className="flex justify-end px-5 pt-2">
          <button onClick={() => props.CloseMenu()}>
            <XMarkIcon className="h-9 w-9  " />
          </button>
        </div>

        <div className="px-11 pt-3">
          <h1 className="text-4xl text-center  ">
            Hello,
            <b>
            {userInfo?.fName} <br /> {userInfo?.lName}
            </b>
          </h1>
          <div className="flex items-center justify-center pt-2 ">
            {" "}
            <NavLink
              to="/Library"
              className={
                "flex items-center justify-center gap-3 text-base max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20  "
              }
            >
              <RectangleStackIcon className="w-6 h-6" />
              My Library
            </NavLink>
          </div>

          <div className=" pt-10   md:pt-6 flex flex-col justify-start gap-4 ">
            <NavLink
              to="/"
              className={
                "flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20 border-b-2 py-2"
              }
            >
              <HomeIcon className="w-6 h-6" />
              Home
            </NavLink>
            <NavLink
             to="/Books?By=2" 
             className={
                "flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20 border-b-2 py-2"
              }
            >
              <BookOpenIcon className="w-6 h-6" />
              Browse Books
            </NavLink>

            <NavLink
             to="/Books?By=0" 
             className={
                "flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20 border-b-2 py-2"
              }
            >
              <StarIcon className="w-6 h-6" />
              Top Rated
            </NavLink>
            <NavLink
             to="/Books?By=1" 
             className={
                "flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20 border-b-2 py-2"
              }
            >
              <FireIcon className="w-6 h-6" />
              Most Visited
            </NavLink>

            <NavLink 
             to="/Books?By=2" 
              className={
                "flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20 border-b-2 py-2"
              }
            >
              <CalendarDaysIcon className="w-6 h-6" />
              Recent Books
            </NavLink>


         { userInfo?.roles=="admin" &&  <NavLink
              to="/Admin/Admins"
              className={
                "flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20 bg-yellow-600  py-2 px-3 rounded-lg self-center"
              }
            >
              <KeyIcon className="w-6 h-6" />
              Admin
            </NavLink>}
            <br />

            <h2 className="text-gray-500 ">By Genre</h2>

            <div className="flex flex-row flex-wrap gap-2">
              {genres.map((el, i) => (
                <NavLink
                  key={i}
                  to={"/Books?genre="+el.value }
                  className={
                    "rounded-md text-xs max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20 hover:bg-white/10  border-2 py-2 px-3"
                  }
                >
                  {el.value}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
