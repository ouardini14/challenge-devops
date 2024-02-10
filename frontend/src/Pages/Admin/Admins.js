import React, { useEffect } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useDeleteAdminMutation, useGetAllAdminsQuery } from '../../Services/Admin.Service'
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux'

export default function Admins() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllAdminsQuery({ refetchOnMountOrArgChange: true })
  const { userInfo } = useSelector((state) => state.auth)

  const [deleteAdmin, response] = useDeleteAdminMutation()
  useEffect(() => {
    if(response.isSuccess==true)
      {
        toast.success("Admin Deleted !")
      }

  }, [response])
  return (
    <div >
            <Toaster />

  {isLoading && "loading"}
        {data?.length>0 && data.map((el,i)=>
        userInfo?._id!=el._id &&
      <div key={i} className=' flex md:flex-row md:px-5 flex-col items-center justify-between gap-4 px-0 py-8 border-t-2 border-white '>
      <div className='flex flex-row  flex-wrap items-center justify-center gap-x-12 gap-y-3  md:gap-16 '>
        <div className='text-lg '><b>Full Name :<br/> </b><span >{el.fName +" "+el.lName}</span> </div>
        <div className='text-lg '><b>Email : <br/></b><span className='text-sm' >{el.email}</span> </div>
        <div className='text-lg '><b>Role : <br/></b><span  >Admin</span> </div>

      </div>

      <div className='flex items-center justify-center gap-4 '>
         <button  onClick={()=>deleteAdmin(el._id)} className='bg-white p-3 rounded-full ' >
        <TrashIcon className="w-6 h-6 text-red-800" />
         </button>
      </div>

      </div>
        )
}

    </div>
  )
}
