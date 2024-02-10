import React, { useEffect } from 'react'
import { ReactReader } from 'react-reader';
import { useParams } from 'react-router-dom';
import { useGetBookUrlQuery } from "../Services/Book.Service";
import { reactReaderStyles } from '../constants';
export default function Reader() {
    const params = useParams();
    
    const { data:book, error, isFetching,isError } = useGetBookUrlQuery(params.BookId)

  return (
    <div className="">
          {isFetching && "loading"}

   { book && <>
         <h1 className='text-center text-white text-2xl md:text-5xl pb-11'>{book.name}</h1>

   <div className="h-screen overflow-hidden shadow-slate-100/10 shadow-xl rounded-lg my-14 md:mx-5 lg:mx-10">
     <ReactReader
     title={book.name}
     readerStyles ={reactReaderStyles}
        url={book.url}
        epubInitOptions={{
          openAs: 'epub'
        }}
        getRendition={(rendition) => {
          rendition.themes.register('custom', {
            p: {
              color:'white',
            }
          })
          rendition.themes.select('custom')
        }}
      />
      </div></>
      }

   </div>
  )
    }