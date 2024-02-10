import { PlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import AddAdmin from '../../Components/Admin/AddAdmin';
import AddAuthor from '../../Components/Admin/AddAuthor';
import AddBook from '../../Components/Admin/AddBook';
import EditAuthor from '../../Components/Admin/EditAuthor';
import { useGetAllAuthorsQuery } from '../../Services/Author.Service';

export default function Admin() {
  const { userInfo } = useSelector((state) => state.auth)
  const [AddAdminModel, setAddAdminModel] = useState(false)
  const [AddAuthorModel, setAddAuthorModel] = useState(false)
  const [AddBookModel, setAddBookModel] = useState(false)


  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllAuthorsQuery({ refetchOnMountOrArgChange: true })
  const path =useLocation()
  return (
    <div className='relative px-3 lg:px-10 xl:px-14 '>
    {AddAdminModel &&  <AddAdmin setAddAdminModel={setAddAdminModel}/>}
    { AddAuthorModel && <AddAuthor setAddAuthorModel={setAddAuthorModel}/>}
   {  AddBookModel && <AddBook setAddBookModel={setAddBookModel} listAuthors={data}/>}

    <h1 className='text-2xl lg:text-5xl font-bold pb-10 text-center'>Admin Dashboard</h1>

      <div className='flex items-center justify-center text-2xl lg:text-3xl pb-5 '>
        <Link to="Admins" className={`bg-black/30 ${path.pathname=='/Admin/Admins' ? "opacity-70 ":"shadow-lg"} shadow-gray-900 rounded-l-lg px-4 py-3 transform transition-all duration-300 ease-in-out hover:opacity-30`}>Admins</Link>
        <Link to="Authors" className={`bg-black/30 ${path.pathname=='/Admin/Authors' ? "opacity-70 ":"shadow-lg"} shadow-gray-900 rounded-r-lg px-4 py-3 transform transition-all duration-300 ease-in-out hover:opacity-30`}>Authors</Link>
      </div>
      <div className='px-2 md:px-5 xl:px-7 2xl:px-16'>
      <Outlet />
      </div>
      <div className="fixed bottom-3 right-5 flex flex-col gap-4 items-end ">
      <button   onClick={()=>setAddAuthorModel(true)} disabled={AddAuthorModel} className={   "disabled:opacity-70 disabled:cursor-not-allowed text-black flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-black/20 bg-white  py-2 px-3 rounded-lg " }>
          <PlusIcon className="w-6 h-6" /> Add Author
          </button>

          <button    onClick={()=>setAddAdminModel(true)} disabled={AddAdminModel} className={   "disabled:opacity-70 disabled:cursor-not-allowed text-black flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-black/20 bg-white  py-2 px-3 rounded-lg " }>
          <PlusIcon className="w-6 h-6" /> Add Admin
          </button>
          <button onClick={()=>setAddBookModel(true)} disabled={AddBookModel} className={   "disabled:opacity-70 disabled:cursor-not-allowed text-black flex items-center gap-3 text-lg max-w-fit transform transition-all duration-300 ease-in-out hover:text-black/20 bg-white  py-2 px-3 rounded-lg " }>
          <PlusIcon className="w-6 h-6" /> Add Book
          </button>
      </div>



    </div>
  );
};
