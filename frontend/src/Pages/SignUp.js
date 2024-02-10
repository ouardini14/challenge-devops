import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Redux/auth/authAction';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const dispatch=useDispatch()
      const { loading, userInfo, error,success } = useSelector((state) => state.auth)

      const [Error, setError] = useState("");
    
      const [CheckCaptcha, SetCheckCaptcha] = useState(false);
    
      const password = useRef({});
      password.current = watch("password", "");
      const navigate=useNavigate()
      useEffect(()=>{
        /*  if(error){
            toast.error("Something went wrong !")
          }
          if(success){
            toast.success("Account Created")
            setTimeout(()=>{            navigate('/SignIn')
          },2500)
          }*/
      },[loading])

      async function onSubmitForm(values) {
        dispatch(registerUser({
          fName:values.fName,
          lName:values.lName,
          email:values.email,
          password:values.password
        }))  .then((originalPromiseResult) => {
          if(error){
            toast.error("Something went wrong !")
          }
          if(success){
            toast.success("Account Created")
            setTimeout(()=>{            navigate('/SignIn')    },2500)
            }  })
        .catch(err => {
          console.log("rejectedValueOrSerializedError")
        })
    }

      

      return (
        <div className=' min-h-screen py-10 w-screen bg-black/20 backdrop-blur-lg flex items-center justify-center text-black'>
   <Toaster />
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className=" h-full flex flex-col  justify-center space-y-3 px-11 py-20  w-full max-w-[681px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black rounded-2xl "
      >
        <div className="text-center font-bold text-3xl text-white">
          --Sign Up--
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-y-0 justify-center space-y-3  ">
          <label className="flex flex-col space-y-2">
            <span className="text-[#718096]">First Name</span>
            <input
              {...register("fName", {
                required: {
                  value: true,
                  message: "You must enter your First name",
                },
              })}
              className={` border-0 bg-[#E2E8F0] rounded-xl   ${
                errors.fName ? "ring-2 ring-red-500" : null
              }`}
              name="fName"
              type="text"
            />
            <span className="text-red-400 text-sm py-2">
              {errors?.fName?.message}
            </span>
          </label>

          <label className="flex flex-col space-y-2">
            <span className="text-[#718096]">Last Name</span>
            <input
              {...register("lName", {
                required: {
                  value: true,
                  message: "You must enter your Last name",
                },
              })}
              className={` border-0 bg-[#E2E8F0] rounded-xl   ${
                errors.lName ? "ring-2 ring-red-500" : null
              }`}
              name="lName"
              type="text"
            />
            <span className="text-red-400 text-sm py-2">
              {errors?.lName?.message}
            </span>
          </label>
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
                value: 6,
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
        <label className="flex flex-col space-y-2">
          <span className="text-[#718096]">Repeat Password</span>
          <input
            {...register("password2", {
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
            className={` border-0 bg-[#E2E8F0] rounded-xl   ${
              errors.password2 ? "ring-2 ring-red-500" : null
            }`}
            name="password2"
            type="password"
          />
          <span className="text-red-400 text-sm py-2">
            {errors?.password2?.message}
          </span>
        </label>
  

        <ReCAPTCHA
    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
    onChange={(value)=>{SetCheckCaptcha(true)}}
    theme={'dark'}
  />


        <button
          type="submit"
          disabled={!CheckCaptcha || loading }
          className={`bg-black py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
        >
          {loading && "loading"}
          {!loading && "Sign Up"}
        </button>
        <div className="text-red-600 text-center">{Error}</div>
      </form>
    
    
        </div>
      )
    }
    