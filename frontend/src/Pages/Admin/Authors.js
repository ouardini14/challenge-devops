import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import EditAuthor from '../../Components/Admin/EditAuthor';
import { useDeleteAuthorMutation, useGetAllAuthorsQuery } from '../../Services/Author.Service'

export default function Authors() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllAuthorsQuery({ refetchOnMountOrArgChange: true })
  const [EditAuthorMode, setEditAuthorMode] = useState(false)
  const [Author, setAuthor] = useState()
  const [deleteAuthor, response] = useDeleteAuthorMutation()
  useEffect(() => {
    if(response.isSuccess==true)
      {
        toast.success("Author Deleted !")
      }
  
  }, [response])
  


  return (
    <div className='flex flex-col items-center justify-center'>
      <Toaster />
      {  EditAuthorMode && Author && <EditAuthor el={Author} closeEditAuthor={setEditAuthorMode}/>}

      {isLoading && "loading"}
        {data?.length>0 && data.map((el,i)=>
 <div key={i} className=' flex md:flex-row md:px-5 flex-col items-center justify-between gap-4 px-0 py-8 border-t-2 border-white '>
      <div className='flex flex-row   gap-24  md:gap-16 '>
        <div className='text-lg '><b>Full Name :<br/> </b><span >{el.name}</span> </div>
        <div className='text-lg '><b>Country: <br/></b><span >{el.Country}</span> </div>
      </div>

      <div className='flex items-center justify-center gap-4 '>
        <button className={`bg-white p-3 rounded-full ${Author && EditAuthorMode&& 'cursor-not-allowed opacity-60'}`}
         onClick={()=>{
          setAuthor(el);
          setEditAuthorMode(true)
        }} >
        <PencilIcon className="w-6 h-6 text-cyan-800" />
         </button>
         <button onClick={()=>deleteAuthor(el._id)} className='bg-white p-3 rounded-full ' >
        <TrashIcon className="w-6 h-6 text-red-800" />
         </button>
      </div>

      </div>
        )}
     


    </div>
  )
}
