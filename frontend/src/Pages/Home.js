import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import BooksList from '../Components/BooksList'
import HomeFirstSection from '../Components/Home/HomeFirstSection/HomeFirstSection'
import Loader from '../Components/Loader'
import { useGetAllBooksQuery } from '../Services/Book.Service'

export default function Home() {
  const { userInfo } = useSelector((state) => state.auth)
  const {
    data:Latesbooks,
    isFetching:LatesbooksisFetching,
  } = useGetAllBooksQuery( {
    filter:'PublishDate',
    sort:'desc',
    select:'_id name CoverPic rating PublishDate',
    start:0,
    qt:10
   },{ refetchOnMountOrArgChange: true })

   const {
    data:MostVisited,
    isFetching:MostVisitedisFetching,
  } = useGetAllBooksQuery( {
    filter:'visits',
    sort:'desc',
    select:'_id name CoverPic rating PublishDate',
    start:0,
    qt:10
   },{ refetchOnMountOrArgChange: true })

  return (
    <div className=' '>
    <HomeFirstSection />     
    <div className='px-3 py-16 lg:px-10 xl:px-14'>
      <h1 className='mx-5 my-4 md:mb-7 py-2 font-bold text-xl md:text-3xl border-l-4 border-l-cyan-900/50 pl-5'>Latest Books</h1>
      {(Latesbooks   && !LatesbooksisFetching) ?  
      <BooksList list={Latesbooks}/>
        :
        LatesbooksisFetching && <Loader  width={9} height={9} color={'text-white'} />
    
    }
      </div> 

      <div className='px-3 py-16 lg:px-10 xl:px-14'>
      <h1 className='mx-5 my-4 md:mb-7 py-2 font-bold text-xl md:text-3xl border-l-4 border-l-cyan-900/50 pl-5'>Most Visited Books</h1>
      {(MostVisited   && !MostVisitedisFetching) ?  
      <BooksList list={MostVisited}/>
        :
        MostVisitedisFetching && <Loader  width={9} height={9} color={'text-white'} />
    
    }
      </div> 
    </div>
  )
}
