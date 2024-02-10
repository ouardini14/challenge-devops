import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form"

import Select from "react-select";
import { genres } from "../../constants";
import { toast } from "react-hot-toast";
import { useGetAllAuthorsQuery } from "../../Services/Author.Service";
import uploadMedia from "./uploadMedia";
import { getDownloadURL } from "firebase/storage";
import { useEditBookMutation } from "../../Services/Book.Service";



export default function EditBook({el,closeEdit}) {
    const [Loading, setLoading] = useState(false)

    const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors },
    } = useForm();
    const [EditBook, result] = useEditBookMutation()

    useEffect(()=>{
      reset({
        name:el.name,
        Summary:el.Summary,
        genre:el.genre.map((e,i)=>({'value':e,'label':e})),
        language:el.language,
        author:{'value':el.author._id,'label':el.author.name},
        PublishDate:new Date(el.PublishDate).toLocaleString("default", { year: "numeric" })+'-'+new Date(el.PublishDate).toLocaleString("default", { month: "2-digit" })+"-"+new Date(el.PublishDate).toLocaleString("default", { day: "2-digit" })
    })
    },[])

    useEffect(() => {
      if(result.isSuccess){
        toast.success('book edited successfully ! ')
        setLoading(false)
        closeEdit(false)
      }
    
     
    }, [result.isLoading])
    
      const {
        data:listAuthors,
        isFetching:listAuthorsisFetching
      } = useGetAllAuthorsQuery({ refetchOnMountOrArgChange: true })

     const ChangeCover=async(file)=>{
      const toastId = toast.loading("Loading...");

      if(file ){
        const  {uploadTask}= await  uploadMedia(el._id,file,[null])
       uploadTask.on("state_changed",
        (snapshot) => {
    
        },
        (error) => {
          alert(error);
        },
        async () => {
        await  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          toast.dismiss(toastId);
          toast.success("Book Cover Changed");
  
        })
        })
      }
    }
    const ChangeBookUrl=async(file)=>{
      const toastId = toast.loading("Loading...");

      if(file){
        const  {uploadTask2}= await  uploadMedia(el._id,[null],file)
      uploadTask2.on("state_changed",
        (snapshot) => {
    
        },
        (error) => {
          alert(error);
        },
        async () => {
        await  getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {

          toast.dismiss(toastId);
          toast.success("Book File Changed");
      
        })
        })
      }
    }
      async function onSubmitForm(values) {
      setLoading(true)
      EditBook({   id:el._id, 
        Book: 
        { name:values.name,
        Summary:values.Summary,
        genre:values.genre.map((el,i)=>el.value),
        language:values.language,
        author:values.author.value,
        PublishDate:values.PublishDate}}
      )
         
      }


  return (
    <div  className=" min-h-screen py-10 w-screen bg-black/20 backdrop-blur-lg flex items-center justify-center text-black">
    <form
    onSubmit={handleSubmit(onSubmitForm)}
    className=" h-full flex flex-col  justify-center space-y-3 px-11 py-20  w-full max-w-[681px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black rounded-2xl "
  >
    <div className="text-center font-bold text-3xl text-white">
      --Edit Book--
    </div>
    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-14 md:space-y-0 justify-center space-y-3  ">
      <label className="flex flex-col space-y-2">
        <span className="text-[#718096]">Name</span>
        <input
          {...register("name", {
            required: {
              value: true,
              message: "You must enter the book name",
            },
          })}
          className={` border-0 bg-[#E2E8F0] rounded-xl   ${
            errors.name ? "ring-2 ring-red-500" : null
          }`}
          name="name"
          type="text"
        />
        <span className="text-red-400 text-sm py-2">
          {errors?.name?.message}
        </span>
      </label>

      <label className="flex flex-col space-y-2">
        <span className="text-[#718096]">Publish Date</span>
        <input
          {...register("PublishDate", {
            required: {
              value: true,
              message: "You must enter your Last name",
            },
          })}
          className={` border-0 bg-[#E2E8F0] rounded-xl   ${
            errors.PublishDate ? "ring-2 ring-red-500" : null
          }`}
          name="PublishDate"
          type="date"
        />
        <span className="text-red-400 text-sm py-2">
          {errors?.PublishDate?.message}
        </span>
      </label>
    </div>

    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-14    md:space-y-0 justify-center space-y-3  ">
      <label className="flex flex-col space-y-2">
        <span className="text-[#718096]">Genre</span>
        <Controller
          name="genre"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Genre required.",
            },
          }}
          render={({ field }) => (
            <Select
              isMulti
              name="genre"
              className="basic-multi-select w-full bg-[#E2E8F0]"
              classNamePrefix="select"
              {...field}
              options={genres}
            />
          )}
        />

        <span className="text-red-400 text-sm py-2">
          {errors?.genre?.message}
        </span>
      </label>

      <label className="flex flex-col space-y-2">
        <span className="text-[#718096]">Language</span>
        <input
          {...register("language", {
            required: {
              value: true,
              message: "You must enter book's language",
            },
          })}
          className={` border-0 bg-[#E2E8F0] rounded-xl   ${
            errors.language ? "ring-2 ring-red-500" : null
          }`}
          name="language"
          type="text"
        />
        <span className="text-red-400 text-sm py-2">
          {errors?.language?.message}
        </span>
      </label>
    </div>

    <label className="flex flex-col space-y-2">
      <span className="text-[#718096]">Author</span>
      <Controller
        name="author"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Author required.",
          },
        }}
        render={({ field }) => (
          <Select
            name="author"
            className="w-full bg-[#E2E8F0]"
            classNamePrefix="select"
            {...field}
            options={listAuthors && listAuthors.map((el,i)=>({value:el._id,label:el.name}))}
          />
        )}
      />

      <span className="text-red-400 text-sm py-2">
        {errors?.author?.message}
      </span>
    </label>

    <label className="flex flex-col space-y-2">
      <span className="text-[#718096]">Summary</span>
      <textarea
        {...register("Summary", {
          required: {
            value: true,
            message: "You must enter your Summary",
          },
          minLength: {
            value: 4,
            message: "This is not long enough to be a Summary",
          },
        })}
        className={` border-0 bg-[#E2E8F0] rounded-xl   ${
          errors.Summary ? "ring-2 ring-red-500" : null
        }`}
        name="Summary"
        type="text"
      />
      <span className="text-red-400 text-sm py-2">
        {errors?.Summary?.message}
      </span>
    </label>
  
  
    
    <button
      type="submit"
      disabled={Loading}
      className={`bg-black py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
    >
       {Loading ? "loading" :"Edit Book"}
      
    </button>
    <button onClick={()=>closeEdit(false)}
      className={`bg-gray-700 py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
    >
     Cancel
    </button>



    <div className="text-center font-bold text-3xl text-white">
      --Or change Cover/File--
    </div>
    <div className="lg:grid lg:grid-cols-2 lg:gap-14">
      <div class="max-w-xl">
      <span className="text-[#718096]">Change Cover Image :</span>
        <label class=" flex justify-center w-full h-56 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
        <img
        src={el.CoverPic}
        alt={el.name}
        className="w-screen h-auto md:max-w-auto md:max-h-[580px] shadow-black shadow-xl"
      />
          <input
            onChange={(e) => 
              e.target.files.length>0 &&   toast((t) => (
                <div className=" flex flex-col gap-2 text-center space-y-3">
                 <span>Confirm Change Cover ?</span>
                  <div className=" flex gap-4 items-center justify-around" >
                  <button className="text-green-900" onClick={() => {
                    
                     ChangeCover(e.target.files)  
                    toast.dismiss(t.id) }}>
                    Change
                  </button>
                  <span className="w-1 h-8 bg-slate-900"></span>
                  <button onClick={() => {toast.dismiss(t.id) }}>
                    Dismiss
                  </button>
                  </div>
            
                </div>
              ))
            }

            type="file"
       
            name="cover"
            accept="image/png, image/jpeg"
            class="hidden"
          />
          
        </label>
        <span className="text-red-400 text-xs py-2">
        {errors?.cover?.message}
      </span>
      </div>
      <div class="max-w-xl">
      <span className="text-[#718096]">Change Book File  :</span>

        <label class="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
          <span class="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span class="font-medium text-gray-600">
              Book (Format EPUB) Recommended <br />
              Drop file to Attach, or
              <span class="text-blue-600 underline">browse</span>
            </span>
          </span>
          <input
            type="file"
            onChange={(e) => 
              e.target.files.length>0 &&  toast((t) => (
                <div className=" flex flex-col gap-2 text-center space-y-3">
                 <span>Confirm Change Cover ?</span>
                  <div className=" flex gap-4 items-center justify-around" >
                  <button className="text-green-900" onClick={() => {
                    
                     ChangeBookUrl(e.target.files)  
                    toast.dismiss(t.id) }}>
                    Change
                  </button>
                  <span className="w-1 h-8 bg-slate-900"></span>
                  <button onClick={() => {toast.dismiss(t.id) }}>
                    Dismiss
                  </button>
                  </div>
            
                </div>
              ))
           }
            name="Bookfile"
            accept=".epub"
            class="hidden"
          />
        </label>
        <span className="text-red-400 text-xs py-2">
        {errors?.Bookfile?.message}
      </span>
      <span className="text-red-400 text-xs py-2">
        {errors?.Bookfile?.message}
      </span>
      </div>
    </div>

  </form>
  </div>
  )

}
