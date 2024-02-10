import React, { useEffect, useRef} from 'react'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddNewAdminMutation } from '../../Services/Admin.Service';
import { useAddNewAuthorMutation } from '../../Services/Author.Service';
export default function AddAdmin({setAddAdminModel}) {

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const [addNewAdmin, response] = useAddNewAdminMutation()


  const password = useRef({});
  password.current = watch("password", "");



  async function onSubmitForm(values) {
    addNewAdmin(
      {
        fName:values.fName,
        lName:values.lName,
        email:values.email,
        password:values.password
      }
    )
    .unwrap()
    .then(() => {
     reset()
     toast.success(" ")
      setTimeout(()=>setAddAdminModel(false) ,2000)
    })
    .catch((err)=>    toast.error("Email Already In use") )

  }
  return (
    <div className=" min-h-screen py-10 w-screen bg-black/20 backdrop-blur-lg flex items-center justify-center text-black">
   
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className=" h-full flex flex-col  justify-center space-y-3 px-11 py-20  w-full max-w-[681px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black rounded-2xl "
    >
      <div className="text-center font-bold text-3xl text-white">
        --Add A new Admin--
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-14 md:space-y-0 justify-center space-y-3  ">
        <label className="flex flex-col space-y-2">
          <span className="text-[#718096]">First Name</span>
          <input
            {...register("fName", {
              required: {
                value: true,
                message: "You must enter the author's First name",
              },
            })}
            className={` border-0 bg-[#E2E8F0] rounded-xl   ${
              errors.fName? "ring-2 ring-red-500" : null
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
                message: "You must enter the author's Last name",
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
  
   
  
      <button
        type="submit"
        disabled={false}
        className={`bg-black py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
      >
        {/* {loading && "loading"} */}
      Create Admin
      </button>
      <button onClick={()=>setAddAdminModel(false)}
        className={`bg-gray-700 py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
      >
       Cancel
      </button>
      {/* <div className="text-red-600 text-center">{ isError && "Something went wrong"}</div> */}
    </form>
  </div>  )
}
