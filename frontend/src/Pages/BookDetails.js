import {
  ArrowDownTrayIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  BookOpenIcon,
  PencilIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect,useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { books } from "../constants";
import ReactStars from "react-stars";
import Review from "../Components/BookDetails/Review";
import AddReview from "../Components/BookDetails/AddReview";
import { BooksApi, useAddScoreMutation, useDeleteBookMutation, useGetBookQuery } from "../Services/Book.Service";
import { useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import  {deleteBookStorage} from '../Components/Admin/DeleteMedia'

import { useAddToLibraryMutation, useGetUserBooksQuery, useRemoveFromLibraryMutation } from "../Services/User.Service";
import EditBook from "../Components/Admin/EditBook";
import { Helmet } from "react-helmet";


export default function BookDetails() {
  const params = useParams();
  const { userInfo } = useSelector((state) => state.auth)
  const [addScore, response] = useAddScoreMutation()
  const navigate=useNavigate()
  const [Edit, setEdit] = useState(false)
  const [addBook, AddResponse ] = useAddToLibraryMutation()
  const [removeBook,  RemoveResponse] = useRemoveFromLibraryMutation()
  
  const [deleteBook, deleteBookresponse] = useDeleteBookMutation()

  const { data:book, error, isFetching,isError,isSuccess } = useGetBookQuery(params.BookId)
  const {
    data:library
  } = useGetUserBooksQuery(undefined,{ refetchOnMountOrArgChange: true,skip:userInfo?false:true })
  const [trigger, res, lastPromiseInfo] = BooksApi.endpoints.addBookVisit.useLazyQuery()
 useEffect(() => {
   window.scrollTo(0, 0);
 }, []);

 useEffect(() => {
   if (response.isSuccess) {
     toast.success("Thank you for rating the book");
   }
 }, [response.isLoading]);

 useEffect(() => {
   if (isError) {
     navigate("/");
   }
   if(book){  userInfo && (userInfo?.roles!=="admin" && trigger(book._id))
  }
 }, [isFetching]);

 const ratingChanged = (newRating) => {
   addScore({
     id: book._id,
     score: newRating,
   })
 };

 const DeleteBook = async (id) => {
   const toastId = toast.loading("Loading...");
   deleteBook(id)
   await deleteBookStorage(id)
     .then(() => {
       toast.dismiss(toastId);
       toast.success("Book Deleted");
       setTimeout(() => {
         navigate("/");
       }, 2500);
     })
     .catch((err) => {
       toast.dismiss(toastId);
       toast.error("Something Went wrong");
     });
 };
 
  
  return (
    <div className="min-h-screen relative">

       <Toaster />


      {
        isFetching ? "Loading book"
        :
        <>    
        <Helmet>
        <title>{book.name}</title>
        <meta name="description" content={book.Summary} />
        <meta name="og:title" content={book.name}/>
        <meta name="og:description" content={book.Summary}/>
        <meta property="og:image" content={book.CoverPic}/>
        <meta property="og:type" content="book" />
        <meta property="og:url" content={'https://react-ebooks-app.vercel.app/Book/'+book._id}/>
        <meta property="book:author" content={'https://react-ebooks-app.vercel.app/Author/'+book.author?._id}/>
        <meta property="book:release_date" content={new Date(book.PublishDate).toLocaleString("default", { year: "numeric" })+'-'+new Date(book.PublishDate).toLocaleString("default", { month: "2-digit" })+"-"+new Date(book.PublishDate).toLocaleString("default", { day: "2-digit" })}/>
        <meta name="keywords" content={book.genre.join(',')} />
        {book.genre.map((el, i) => (
        <meta property="book:tag" content={el}/>
        ))
          }
      
          </Helmet> 
     <div className="relative h-full flex flex-col md:grid grid-cols-3 md:items-center md:px-3 lg:px-7 xl:px-12   2xl:px-36 md:gap-3  gap-5 pb-16">

     <div className="flex flex-col gap-2">
      <img
        src={book.CoverPic}
        alt={book.name}
        className="w-screen h-auto md:max-w-auto md:max-h-[580px] shadow-black shadow-xl"
      />
      <div className=" flex flex-col gap-3 mx-9 mt-9">
        <NavLink
        to={"/Reader/"+(book._id)}
          className={
            " px-3 py-2 text-center rounded-lg bg-[#E5BA73] hover:scale-105  text-black  transform transition-all duration-500 ease-in-out flex items-center "
          }
        >
          <BookOpenIcon className="w-6 h-6" />
          <span className="text-center flex-grow">Read Now</span>

        </NavLink>
        <a href={book.url}
          className={
            " px-3 py-2 text-center rounded-lg bg-[#E5BA73] hover:scale-105  text-black  transform transition-all duration-500 ease-in-out flex items-center "
          }
        >
          <ArrowDownTrayIcon className="w-6 h-6" />
          <span className="text-center flex-grow">Download Now</span>{" "}
        </a>
   
        {library?.includes(book._id) ?
           <button
           onClick={() => {
            removeBook(book._id)
          }}
           className={
             " px-3 py-2 text-center rounded-lg bg-[#E5BA73] hover:scale-105  text-black  transform transition-all duration-500 ease-in-out flex items-center "
           }
         ><BookmarkSlashIcon className="w-6 h-6" />
         <span className="text-center flex-grow">Remove from library</span></button> 
          :
          <button
          onClick={() => {
            (userInfo)? addBook(book._id) : navigate("/SignIn")
          }}
          className={
            " px-3 py-2 text-center rounded-lg bg-[#E5BA73] hover:scale-105  text-black  transform transition-all duration-500 ease-in-out flex items-center "
          }
        ><BookmarkIcon className="w-6 h-6" />
         <span className="text-center flex-grow">Add To library </span></button>
        }
        
      </div>
    </div>

    <div className="px-2  space-y-5 col-span-2">
      <h1 className="text-5xl font-bold text-center md:text-left  ">{book.name}</h1>
      <div className="flex justify-center items-center md:justify-start">
       <div className="flex flex-col  items-center justify-center">
       <ReactStars
          count={5}
          value={book?.rating}
          half={false}
          edit={userInfo?.RatedBooks.includes(book._id) || !userInfo   ? false :true }
          onChange={ratingChanged}
          size={48}
          color2={"#ffd700"}
        />
           <span className="text-xs italic">{book?.score.length} Vote{'(s)'}</span>
       </div>
     { !userInfo &&  <span className="text-xs">Log In To <br/> rate this Book</span>}
     { userInfo?.RatedBooks.includes(book._id)  &&  <span className="text-center text-xs">You have <br/> rated this book</span>}

      </div>
      <div className=" italic text-center  md:text-left">
        Language : {book.language}
        </div>
      <div className=" italic flex flex-col md:flex-row gap-5  items-center justify-center  md:justify-start">
        <div className="">{new Date(book.PublishDate).toLocaleDateString('en-Us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div className=" text-gray-500">
          Written By : 
          <NavLink to={"/Author/"+book.author?._id} className={"max-w-fit text-white border-b-2"}>
           {book.author?.name}
          </NavLink>
        </div>
      </div>
      <p className="italic text-gray-500 text-lg text-center md:text-left md:px-0 px-4 max-w-2xl ">
        {book.Summary}
      </p>

      <div className="px-4 space-y-3">
        <h2 className="text-3xl ">Genre :</h2>
        <div className="flex flex-row justify-center md:justify-start  flex-wrap gap-2">
          {book.genre.map((el, i) => (
            <NavLink
              key={i}
              to={"/Books?genre="+el }
              className={
                "rounded-md  max-w-fit transform transition-all duration-300 ease-in-out hover:text-white/20 hover:bg-white/10  border-2 py-2 px-3"
              }
            >
              {el}
            </NavLink>
          ))}
        </div>
      </div>


    </div> 
  </div>
        {/*Edit Book*/}
      
{userInfo?.roles==="admin" &&

<> 
{Edit &&  <EditBook el={book}  closeEdit={setEdit}/>} 
<div className="fixed bottom-3 right-5 flex flex-col gap-4 items-end z-10 ">
      <button onClick={()=>setEdit(true)}   className={   "  flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-black/20 bg-green-900  py-2 px-3 rounded-lg " }>
          <PencilIcon className="w-6 h-6" /> Edit 
          </button>
          <button  onClick={()=>
              toast((t) => (
                <div className=" flex flex-col gap-2 text-center space-y-3">
                 <span>Confirm Delete ?</span>
                  <div className=" flex gap-4 items-center justify-around" >
                  <button className="text-red-900" onClick={() => {
                    
                     DeleteBook(book._id)  
                    toast.dismiss(t.id) }}>
                    Delete
                  </button>
                  <span className="w-1 h-8 bg-slate-900"></span>
                  <button onClick={() => {toast.dismiss(t.id) }}>
                    Dismiss
                  </button>
                  </div>
            
                </div>
              ))
         
        
        } className={   "  flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-black/20 bg-red-900 py-2 px-3 rounded-lg " }>
          <TrashIcon className="w-6 h-6" /> Delete 
          </button>
      </div></>


}
    <div className=" border-y-2 border-white py-10 px-2">
        <h1 className="text-center text-3xl">
            Reviews :
        </h1>
        <div className="pt-4">
            <AddReview  userInfo={userInfo} book={book._id}/>
            {
                book.review.map((el,i)=>(
                    <div key={i}>
                        <Review Review={el}/>
                    </div>
                ))
            }

        </div>
        
    </div>  </> 
      }

            
                     
    </div>
  );
}
