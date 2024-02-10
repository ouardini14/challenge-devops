import React from 'react'
import logo from '../../img/logo.png'; 

export default function Footer() {
  return (
    <div className='flex flex-col items-center justify-center px-14 py-10 gap-8'>  
        <div className=' flex items-center justify-center gap-8'>

          <img src={logo} alt="Logo" className='w-24 h-24 cursor-pointer'/>
          <h1 className='text-3xl'>E-books</h1>
        </div>

        <div className='font-light text-gray-400 italic text-center max-w-[900px]'>
       <span className='font-semibold'>Reading</span>  is essential for personal and professional growth, but it's hard to find the right book that fits our exact needs — plus, often times we end up paying more than necessary for our favorite reads.
        <br/><br/>
        Designed & Done By :   <a href='https://www.linkedin.com/in/anass-ouardini' className='font-semibold '>@Ouardini Anass</a> 
        </div>

    </div>
  )
}
