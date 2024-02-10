import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import Search from "../Search/Search";
import {
  UserIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import SideMenu from "../SideMenu/SideMenu";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCredentials } from "../../Redux/auth/authSlice";
import { useGetUserDetailsQuery } from "../../Services/Auth";

export default function Header() {
  const [SearchMobile, setSearchMobile] = useState(false);
  const [SideMenuOpen, setSideMenuOpen] = useState(false);

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000,
  });

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
    const nvigate=useNavigate()
  const path = useLocation();
  function OpenMenu() {
    setSideMenuOpen(true)
    gsap
      .timeline()
      .to("#SideMenu", {
        left: 0,
        duration: 0.5,
        ease: "Expo.InOut",
      })
      .to(
        "#SideMenuBg",
        {
          display: "flex",
        },
        "-=0.4"
      );
  }
  function CloseMenu() {
    setSideMenuOpen(false)

    gsap
      .timeline()
      .to("#SideMenu", {
        left: "-100%",
        duration: 0.5,
        ease: "Expo.InOut",
      })
      .to(
        "#SideMenuBg",
        {
          display: "none",
        },
        "-=0.5"
      );
  }

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  if (path.pathname == "/SignUp" || path.pathname == "/SignIn") {
    return null;
  } else {
    return (
      <div className="w-screen px-3 lg:px-16 py-10  ">
        <div className="flex   md:gap-3 items-center justify-between pb-3  ">
          <div className="flex  items-center justify-center gap-4 md:order-2">
            <button
              onClick={() => OpenMenu()}
              className="gap-2  flex bg-black/50 p-2 rounded-lg transform transition-all duration-300 ease-in-out hover:bg-black/90 "
            >
              <Bars3Icon className="h-6 w-6 " />
              Browse
            </button>
            <div className="hidden md:inline flex-grow">
              <Search />
            </div>
          </div>

          <div className="max-w-fit md:order-1">
            <NavLink to="/">
              <img src={logo} alt="Logo" className="w-24 h-24 cursor-pointer" />
            </NavLink>
          </div>

          <div className="flex  items-end justify-end md:order-3">
            {userInfo ? (
              <button
                onClick={() =>  {
                  dispatch(logout()) 
                  nvigate('/SignIn')
                 }
                }
                className="gap-1 flex   p-2 rounded-lg transform transition-all duration-300 ease-in-out hover:text-white/20 "
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 " />
                <span className="hidden md:inline">Log Out</span>
              </button>
            ) : (
              <NavLink
                to="/SignIn"
                className="gap-2 flex   p-2 rounded-lg transform transition-all duration-300 ease-in-out hover:text-white/20 "
              >
                <UserIcon className="h-6 w-6 " />
                <span className="hidden md:inline">Sign In</span>
              </NavLink>
            )}

            <button
              onClick={() => setSearchMobile(!SearchMobile)}
              className="md:hidden gap-2 flex   p-2 rounded-lg transform transition-all duration-300 ease-in-out hover:text-white/20 "
            >
              <MagnifyingGlassIcon className="h-6 w-6 " />
            </button>
          </div>
        </div>

        {SearchMobile && <Search />}
        <SideMenu CloseMenu={CloseMenu} SideMenuOpen={SideMenuOpen}  userInfo={userInfo}/>
      </div>
    );
  }
}
