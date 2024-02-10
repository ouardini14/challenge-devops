import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAddNewBookMutation, useEditBookMutation } from "../../Services/Book.Service";
import { storage } from "../../utils/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Select from "react-select";
import uploadMedia from "./uploadMedia";
import { deleteBookStorage } from "./DeleteMedia";
import { genres } from "../../constants";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Loader from "../Loader";

export default function AddBook({ setAddBookModel,listAuthors }) {
  const [ImgUrl, setImgUrl] = useState(" ")
  const [Cover, setCover] = useState()
  const [BookUrl, setBookUrl] = useState()
  const [Loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [addNewBook, response] = useAddNewBookMutation()
  const [EditBook, result] = useEditBookMutation()

  useEffect(() => {
    if(response.data){
      upload(response.data._id)
    }


   
  }, [response.isLoading])

  useEffect(() => {
    if(result.data){
      setLoading(false)
      reset()
      setCover(null)
      setBookUrl(null)
      toast((t) => (
        <div className=" flex flex-col gap-2 text-center space-y-3">
         <span>New Book</span>
      <span>  Click here to visit <NavLink to={"/Book/"+result.data._id} className={'underline underline-offset-4 text-cyan-900 items-baseline'}><br/> <b>{result.data.name}</b></NavLink> 
          </span>
          <button onClick={() => {toast.dismiss(t.id)
          setAddBookModel(false)}}>
            Dismiss
          </button>
        </div>
      ));
      setTimeout(()=>setAddBookModel(false) ,3000)
    }


   
  }, [result.isLoading])
  
  async function onSubmitForm(values) {
    setLoading(true)
    setCover(values.cover)
    setBookUrl(values.Bookfile)
   addNewBook(
      { name:values.name,
      Summary:values.Summary,
      genre:values.genre.map((el,i)=>el.value),
      language:values.language,
      author:values.author.value,
      PublishDate:values.PublishDate}
    )



  
  }

 async function upload(id){
  const  {uploadTask,uploadTask2}= await  uploadMedia(id,Cover,BookUrl)

    uploadTask.on("state_changed",
    (snapshot) => {

    },
    (error) => {
      alert(error);
    },
    async () => {
    await  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          
          uploadTask2.on("state_changed",
          (snapshot) => {
     
          },
          (error) => {
            alert(error);
          },
          async  () => {
              await  getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL2) => {
                  setImgUrl(downloadURL)
              EditBook( {   id, 
              Book: { 
                 url:downloadURL2,
               CoverPic:downloadURL}}

              )
    
            });
          }
        );

      });
    }
  );
  
 }



  return (
      
      
    <div className=" min-h-screen py-10 w-screen bg-black/20 backdrop-blur-lg flex items-center justify-center text-black">
    {Loading && <Loader  width={9} height={9} color={'text-white'} />}
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className=" h-full flex flex-col  justify-center space-y-3 px-11 py-20  w-full max-w-[681px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black rounded-2xl "
      >
        <div className="text-center font-bold text-3xl text-white">
          --Add A new Book--
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
        {
              ImgUrl && <img src={ImgUrl} alt="" className="w-auto h-auto" />
            }
        <div className="lg:grid lg:grid-cols-2 lg:gap-14">
          <div class="max-w-xl">
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
                  Cover Picture (320x500) Recommended <br />
                  Drop file to Attach, or
                  <span class="text-blue-600 underline">browse</span>
                </span>
              </span>
              <input
                type="file"
                {...register("cover", {
                  required: {
                    value: true,
                    message: "You must upload a cover picture",
                  },
                })}
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
                {...register("Bookfile", {
                  required: {
                    value: true,
                    message: "You must upload the Book file",
                  },
                })}
                name="Bookfile"
                accept=".epub"
                class="hidden"
              />
            </label>
            <span className="text-red-400 text-xs py-2">
            {errors?.Bookfile?.message}
          </span>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={false}
          className={`bg-black py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
        >
          {/* {loading && "loading"} */}
          Create Book
        </button>
        <button onClick={()=>setAddBookModel(false)}
          className={`bg-gray-700 py-4 text-white disabled:opacity-20 disabled:cursor-not-allowed rounded-lg }`}
        >
         Cancel
        </button>
        {/* <div className="text-red-600 text-center">{ isError && "Something went wrong"}</div> */}
      </form>
    </div>
    

  );
}
