import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import BooksList from '../Components/BooksList';
import Loader from '../Components/Loader';
import { useGetAllAuthorByIdQuery } from '../Services/Author.Service';
import { BooksApi, useGetAuthorBooksQuery } from '../Services/Book.Service';

export default function BooksByAuthor() {
  const params = useParams();
  const { data:Author, error, isFetching:AuthorIsFetching,isError } = useGetAllAuthorByIdQuery(params.AuthorId)
  const [trigger, {data,isFetching,status}, lastPromiseInfo] = BooksApi.endpoints.getAuthorBooks.useLazyQuery()
  const [hasmore, sethasmore] = useState(true)
  const [Books, setBooks] = useState([])
  const [mount, setmount] = useState(true)
  const [load, setLoad] = useState(0)
    const qt=10
  useEffect(() => {
    if(mount){
    trigger({
      id:params.AuthorId,
      start:load,
      qt
     })
     setmount(false)
  }
    if(data?.length>0 ){
      setBooks((Books)=>[...Books,...data])
    }
    if(data?.length===0 && status==="fulfilled"){
     sethasmore(false)
    }
    
   }, [data])
  
   const addMore=()=>{
    trigger({
      id:params.AuthorId,
     start:load+qt,
     qt
    })
    setLoad(load+qt)
  
  }
  return (
    <div className='min-h-screen p-2 px-3 py-5 lg:px-10 xl:px-14 '>
        {AuthorIsFetching && <Loader  width={9} height={9} color={'text-white'} />}
        {Author && !AuthorIsFetching   &&
        <div className='border-l-4 border-l-cyan-900/50 pl-5 py-3 space-y-4   bg-white/10 rounded-lg'>
                  <Helmet>
        <title>{Author.result.name}</title>
        <meta name="description" content={Author.result.Description} />
        <meta name="og:title" content={Author.result.name}/>
        <meta name="og:description" content={Author.result.Description}/>
        <meta property="og:url" content={'https://react-ebooks-app.vercel.app/Author/'+params.AuthorId}/>
        <meta name="keywords" content="Author,Ebook,Online,Read Free,Books,Book Collection" />
        <meta property="book:tag" content="Author"/>
        <meta property="book:tag" content="Ebook"/>
        <meta property="book:tag" content="Read Online Free"/>
        <meta property="book:tag" content="Book Collection"/>
     
          </Helmet> 
        <h1 className='text-2xl md:text-4xl font-semibold'>{Author.result.name}</h1>
        <h2 className='text-sm md:text-lg text-gray-500 ' >Country : <span className='text-white uppercase underline'>{Author.result.Country}</span></h2>
        <h2 className='text-gray-500 text-sm md:text-lg'>{Author.result.Description}</h2>
        <h2 className='text-gray-500 text-sm md:text-lg italic'>Number of Books : <span className='text-white '> {Author.nbr}</span> </h2>
      </div> }

          <div className='my-11 overflow-hidden'>
      {Books.length>0 && 
            <InfiniteScroll
            dataLength={Books.length}
            next={()=>{
              addMore()
            }
            }
           hasMore={ hasmore }
            >
            <BooksList list={Books} />

            </InfiniteScroll> 
        

} </div>




    </div>
  )
}
