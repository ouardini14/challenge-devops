import React, { useEffect } from 'react'
import { useEditBookMutation } from '../../Services/Book.Service';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {  useEditAuthorMutation } from '../../Services/Author.Service';


export default function EditAuthor({el,closeEditAuthor}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const [EditAuthor, result] = useEditAuthorMutation()

      useEffect(()=>{
       reset({
          name:el.name,
          Country:el.Country,
          Description:el.Description
      })
      },[])


      async function onSubmitForm(values) {
    EditAuthor({   id:el._id, 
          Author: 
          { name:values.name,
            Country:values.Country,
            Description:values.Description}}
        )
        .unwrap()
        .then(() => {
          reset()
          toast.success("Author Edited Successfully !")
          setTimeout(()=>closeEditAuthor(false) ,2000)
        })
        .catch((error) => {
          toast.error("Something Went wrong")
        })   

      }

  return (
    <div className=" min-h-screen py-10 w-screen bg-black/20 backdrop-blur-lg flex items-center justify-center text-black">
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className=" h-full flex flex-col  justify-center space-y-3 px-11 py-20  w-full max-w-[681px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black rounded-2xl "
    >
      <div className="text-center font-bold text-3xl text-white">
        --Edit Author--
      </div>
        <label className="flex flex-col space-y-2">
          <span className="text-[#718096]">Full Name</span>
          <input
            {...register("name", {
              required: {
                value: true,
                message: "You must enter the author's  name",
              },
            })}
            className={` border-0 bg-[#E2E8F0] rounded-xl   ${
              errors.name? "ring-2 ring-red-500" : null
            }`}
            name="name"
            type="text"
          />
          <span className="text-red-400 text-sm py-2">
            {errors?.name?.message}
          </span>
        </label>

  

    
        <label className="flex flex-col space-y-2">
          <span className="text-[#718096]">Country</span>
          <input
            {...register("Country", {
              required: {
                value: true,
                message: "You must enter The Country",
              },
            })}
            className={` border-0 bg-[#E2E8F0] rounded-xl   ${
              errors.Country ? "ring-2 ring-red-500" : null
            }`}
            name="Country"
            type="text"
          />
          <span className="text-red-400 text-sm py-2">
            {errors?.Country?.message}
          </span>
        </label>
    

      

      <label className="flex flex-col space-y-2">
        <span className="text-[#718096]">Description</span>
        <textarea
          {...register("Description", {
            required: {
              value: true,
              message: "You must enter your Description",
            },
            minLength: {
              value: 4,
              message: "This is not long enough to be a Description",
            },
          })}
          className={` border-0 bg-[#E2E8F0] rounded-xl   ${
            errors.Description ? "ring-2 ring-red-500" : null
          }`}
          name="Description"
          type="text"
        />
        <span className="text-red-400 text-sm py-2">
          {errors?.Description?.message}
        </span>
      </label>
  
      <button
        type="submit"
        disabled={false}
        className={`bg-black py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
      >
        {/* {loading && "loading"} */}
        Edit Author
      </button>
      <button onClick={()=>closeEditAuthor(false)}
        className={`bg-gray-700 py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
      >
       Cancel
      </button>
      {/* <div className="text-red-600 text-center">{ isError && "Something went wrong"}</div> */}
    </form>
  </div>
  )
}


