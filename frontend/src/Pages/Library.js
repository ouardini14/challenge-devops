import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import BooksList from '../Components/BooksList';
import { userApi } from '../Services/User.Service';

export default function Library() {
  const [trigger, {data,isFetching,status}, lastPromiseInfo] = userApi.endpoints.getUserLibrary.useLazyQuery()
  const [hasmore, sethasmore] = useState(true)
  const [Books, setBooks] = useState([])
  const [mount, setmount] = useState(true)
  const [load, setLoad] = useState(0)
    const qt=10
  useEffect(() => {
    if(mount){
    trigger({
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
     start:load+qt,
     qt
    })
    setLoad(load+qt)
  
  }

  return (
    <div className='px-3 py-16 lg:px-10 xl:px-14 '>
        <h1 className='text-2xl font-bold pb-20 lg:text-5xl text-center'>My Library</h1>



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

