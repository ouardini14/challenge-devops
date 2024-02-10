import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser } from '../Redux/auth/authAction';
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      const navigate = useNavigate()

      useEffect(() => {
        if(userInfo){
        toast.success("Logged In")
          setTimeout(()=> navigate('/'),1500)}
         
        
        if(error){
          toast.error(error)
        }
      }, [loading])
    
    

      async function onSubmitForm(values) {
        dispatch(LoginUser(values))
      }

      return (
        <div className=' min-h-screen py-10 w-screen bg-black/20 backdrop-blur-lg flex items-center justify-center text-black'>
   <Toaster />

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className=" h-full flex flex-col  justify-center space-y-3 px-11 py-20  w-full max-w-[681px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black rounded-2xl "
      >
           <NavLink to={'/'} className="text-left font-bold text-3xl text-gray-600  underline">
    Back
   </NavLink>
        <div className="text-center font-bold text-3xl text-white">
          --Sign In--
        </div>
   
   

        <label className="flex flex-col space-y-2">
          <span className="text-[#718096]">Email Address</span>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "You must enter your email address",
              },
              minLength: {
                value: 8,
                message: "This is not long enough to be an email",
              },
              maxLength: {
                value: 120,
                message: "This is too long",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "This needs to be a valid email address",
              },
            })}
            className={` border-0 bg-[#E2E8F0] rounded-xl   ${
              errors.email ? "ring-2 ring-red-500" : null
            }`}
            name="email"
            type="text"
          />
          <span className="text-red-400 text-sm py-2">
            {errors?.email?.message}
          </span>
        </label>

        <label className="flex flex-col space-y-2">
          <span className="text-[#718096]">Password</span>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "You must enter your password",
              },
              minLength: {
                value: 3,
                message: "This is not long enough to be a password",
              },
            })}
            className={` border-0 bg-[#E2E8F0] rounded-xl   ${
              errors.password ? "ring-2 ring-red-500" : null
            }`}
            name="password"
            type="password"
          />
          <span className="text-red-400 text-sm py-2">
            {errors?.password?.message}
          </span>
        </label>
       

   

        <button
          type="submit"
          disabled={ loading }
          className={`bg-black py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
        >
          {loading && "loading"}
          {!loading && "Sign In"}
        </button>
        <div className="text-red-600 text-center">{Error}</div>

        <div className=' text-center text-white'>
            Or <NavLink to="/SignUp" className={'text-cyan-700 underline'}>Register </NavLink>
        </div>
        

      </form>

    
    
        </div>
      )
    }
    