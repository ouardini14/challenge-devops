import React from 'react'

export default function Review({Review}) {
  return (
    <div className='border-y-2 border-white/10 py-6'> 
      <div className='space-y-2 md:grid md:grid-cols-3 gap-4  px-4 '>
      <div className='text-2xl '>{Review.user.fName +" "+Review.user.lName} :</div>
        <p className=''>{Review.ReviewText}</p>


    </div>
    <div className='text-right text-xs italic pr-5 text-gray-300'>
    {new Date(Review.ReviewDate).toLocaleDateString('en-Us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
     </div>

    </div>
   
  )
}
