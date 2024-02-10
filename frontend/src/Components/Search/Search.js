import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon,ArrowPathRoundedSquareIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { useGetAllAuthorsByNameQuery } from '../../Services/Author.Service'
import { useGetAllBooksByNameQuery } from '../../Services/Book.Service'
import Loader from '../Loader'
import Book from './Book'
import { useLocation } from 'react-router-dom'
import Author from './Author'

export default function Search() {
    const [SearchBy,SetSearchBy]=useState("Books")
    const [Seaching,SetSeaching]=useState(false)

    const [nameBook,SetnameBook]=useState("")
    const [nameAuthor,SetnameAuthor]=useState("")

    const [skipBook, setSkipBook] = React.useState(true)
    const [skipAuthor, setSkipAuthor] = React.useState(true)
    const path = useLocation();

    const { data:dataAuthor, error:errorAuthor, isLoading:isLoadinAuthor, isUninitialized:startedAuthor } = useGetAllAuthorsByNameQuery(
      nameAuthor,
      {
        skip:skipAuthor,
      }
    )

    const { data:dataBook, error:errorBook, isLoading:isLoadinBook, isUninitialized:startedBook } = useGetAllBooksByNameQuery(
      nameBook,
      {
        skip:skipBook,

      }
    ) 
     useEffect(() => {
      if(Seaching){
       SetSeaching(false)
      }
    }, [path.pathname])




  function GetData(c){
    if(SearchBy==="Books")  {
      skipBook &&  setSkipBook(false)
      SetnameBook(c)
    }
    if(SearchBy==="Authors") {   
      skipAuthor &&  setSkipAuthor(false) 
      SetnameAuthor(c)
      }

  }

  return (
    <div   className='relative   bg-white space-x-0 py-1 px-1  md:space-x-3 md:py-2 md:px-3  max-w-fit rounded-xl flex items-center justify-center '>
      
          { Seaching  ?
       <button onClick={()=>SetSeaching(false)} className='gap-2  flex text-black/50 p-2 rounded-lg transform transition-all duration-300 ease-in-out hover:text-black/20 '>
       <XCircleIcon  className="h-6 w-6 "/>
       </button>
       :
       <MagnifyingGlassIcon  className="h-5 w-5 text-black" />

      }
      <input

      onFocus={()=>SetSeaching(true)}
     /* */
      onChange={(e)=> {e.target.value.length>=1&& GetData(e.target.value)}}
        type="text"
        placeholder={"Search By "+SearchBy}
        className="outline-none text-black m-0 border-0 focus:ring-0 px-2 pr-1 "
      />


      <button onClick={()=>SetSearchBy(SearchBy==="Books" ? "Authors":"Books")} className='gap-2 text-xs sm:text-base  flex items-center justify-center bg-black/50 p-2 rounded-lg transform transition-all duration-300 ease-in-out hover:bg-black/90 '>
                <ArrowPathRoundedSquareIcon  className="h-3 w-3  sm:h-6 sm:w-6 "/>
                    {SearchBy}
                </button>
              

{ Seaching &&  (dataAuthor || dataBook || isLoadinAuthor || isLoadinBook ) &&
   <div className="w-full z-20  flex flex-col border-solid border-[1px] border-gray-100 drop-shadow-2xl absolute top-full -left-0  md:-left-3 right-0  text-black shadow-xl shadow-black  bg-white rounded-xl m-0">
      {dataBook && SearchBy==="Books"  &&
      dataBook.map((el,i)=>(
        <div key={i}>
           <Book book={el} />
        </div>
       
      ))
     
      }
            {dataAuthor&& SearchBy==="Authors"  &&
      dataAuthor.map((el,i)=>(
        <div key={i}>
           <Author author={el} />
        </div>
       
      ))
     
      }
    {(isLoadinAuthor || isLoadinBook) && 
                     <Loader  width={5} height={5} color={'text-black'} />

    }

    
   </div>
}

    </div>
  )
}
