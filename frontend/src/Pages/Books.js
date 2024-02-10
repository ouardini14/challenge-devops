import {  ChevronDownIcon } from '@heroicons/react/24/solid'
import React ,{useEffect, useState}from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'
import BooksList from '../Components/BooksList'
import Loader from '../Components/Loader'
import { genres } from '../constants'
import { BooksApi } from '../Services/Book.Service'

export default function Books() {
  const [searchParams] = useSearchParams();
  const [Genres, setGenres] = useState(searchParams.get('genre')? [searchParams.get('genre')]:[])
    const [hasmore, sethasmore] = useState(true)
    const [Books, setBooks] = useState([])
    const [mount, setmount] = useState(true)

  const filters=[{Name:'By Rating',Value:'rating'},{Name:'By Visits',Value:'visits'},{Name:'By Date',Value:'PublishDate'}]
  const sort=[{Name:'Asc',Value:'asc'},{Name:'Desc',Value:'desc'}]

  const [Filter, setFilter] = useState(searchParams.get('By') ? filters[searchParams.get('By')]:filters[2])
  const [Sort, setSort] = useState(sort[1])
  const [load, setLoad] = useState(0)
    const qt=10


const [trigger, {data,isFetching,status}, lastPromiseInfo] = BooksApi.endpoints.getAllBooks.useLazyQuery()





useEffect(() => {
  if(mount){
  trigger({
    genres:Genres,
    filter:Filter.Value,
    sort:Sort.Value,
    select:'_id name CoverPic rating PublishDate',
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

useEffect(() => {
  if(!mount){
   NewFilter(Filter,Sort)
  }


}, [Genres])


 const NewFilter=(Newfilter,Newsort)=>{
  setBooks([])
  setFilter(Newfilter)
  setSort(Newsort)
  sethasmore(true)
  setLoad(0)
  trigger({
    genres:Genres,
    filter:Newfilter.Value,
    sort:Newsort.Value,
    select:'_id name CoverPic rating PublishDate',
    start:0,
    qt
   })



}


const addMore=()=>{
  trigger({
    genres:Genres,
   filter:Filter.Value,
   sort:Sort.Value,
   select:'_id name CoverPic rating PublishDate',
   start:load+qt,
   qt
  })
  setLoad(load+qt)

}
  return (
    <>
    <div className='px-8 py-8 lg:px-10 xl:px-14 space-y-5 pb-16' >
    <h1 className='text-5xl'>Filters</h1>
      <div className='   flex gap-2   '>

      <div  className='z-20 relative transform transition-all duration-200 ease-in-out hover:bg-white/10 group cursor-pointer rounded-r-lg  px-5 md:mb-7 py-2 text-xl border-l-4 border-l-cyan-900/50 pl-5'>
     <div className=' flex  items-center gap-5 font-bold '>
     <span>{Filter.Name}</span> 
     <ChevronDownIcon className='w-6 h-6 transform transition-all duration-200 ease-in-out group-hover:rotate-180' />  
     </div>
      <div className='hidden group-hover:flex  flex-col  absolute top-full -left-0  rounded-lg right-0 shadow-lg shadow-black bg-white text-black '>
       {
        filters.map((el,i)=>
        (Filter.Name !==el.Name )&& <button key={i} onClick={()=>NewFilter(el,Sort)} className='transform transition-all duration-200 ease-in-out hover:bg-black/10 px-2 py-2 text-base '>
            {el.Name}
        </button>
        )
       }
    

      </div>
      </div>

      <div  className='z-20 relative transform transition-all duration-200 ease-in-out hover:bg-white/10 group cursor-pointer rounded-r-lg  px-5 md:mb-7 py-2 text-xl border-l-4 border-l-cyan-900/50 pl-5'>
     <div className=' flex  items-center gap-5 font-bold '>
     <span>{Sort.Name}</span> 
     <ChevronDownIcon className='w-6 h-6 transform transition-all duration-200 ease-in-out group-hover:rotate-180' />  
     </div>
      <div className='hidden group-hover:flex  flex-col  absolute top-full -left-0  rounded-lg right-0 shadow-lg shadow-black bg-white text-black '>
       {
        sort.map((el,i)=>
        (Sort.Name !==el.Name )&& <button key={i} onClick={()=>NewFilter(Filter,el)} className='transform transition-all duration-200 ease-in-out hover:bg-black/10 px-2 py-2 text-base '>
            {el.Name}
        </button>
        )
       }
    

      </div>
      </div>




      </div>
       <div className='space-y-4 max-w-2xl' >
        <h2 className='pl-3 text-3xl'>Genre: </h2>
      <div className="flex flex-row flex-wrap gap-3">
              {genres.map((el, i) => (
                <button
                  key={i}
                  onClick={()=>{
                    !Genres.includes(el.value)? setGenres((Genres)=>[...Genres,el.value]):setGenres(Genres.filter(genre=>genre!==el.value))   }}
                  className=  {`${Genres.includes(el.value)? 'bg-white/10 shadow-xl scale-105':'' } rounded-md text-xs max-w-fit transform transition-all duration-300 ease-in-out hover:scale-105 shadow-black hover:shadow-xl border-2 py-2 px-3`}
                  
                >
                  {el.value}
                </button>
              ))}
            </div>
                <button 
                 className=  {`${Genres.length > 0? ' cursor-pointer':'text-white/20 cursor-not-allowed' } pl-10 underline underline-offset-4  `}
                onClick={()=>{
                  setGenres([])
                  }}>
                  Clear Genres
                </button>
            </div>


            </div>
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
        

}  
  
</>
   
  )
}
