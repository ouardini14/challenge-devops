import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../Redux/auth/authSlice";
import { authApi, useGetUserDetailsQuery } from "../Services/Auth";
import { useGetUserBooksQuery } from "../Services/User.Service";
import BookThumbnail from "./BookThumbnail";
export default function BooksList({ list }) {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: library,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetUserBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: userInfo ? false : true,
  });
  const container = {
    hidden: { opacity: 0,height:'0' },
    show: {
      opacity: 1,
      height:'100%',
      transition: {
        staggerChildren: 0.2
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <motion.div
    variants={container}
    initial="hidden"
    animate="show"
      className="flex flex-row flex-wrap items-center justify-center  sm:gap-x-5  gap-4 gap-y-12 overflow-hidden md:p-7"
    >
      {list.map((el, i) => (
        <motion.div
        variants={item}  
        key={i}>
          <BookThumbnail
            logged={userInfo ? true : false}
            found={library?.includes(el._id)}
            book={el}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
