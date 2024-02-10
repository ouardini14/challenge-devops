import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAddReviewMutation } from '../../Services/Book.Service';

export default function AddReview({userInfo,book}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [addReview, response] = useAddReviewMutation()

  async function onSubmitForm(values) {
    addReview(
      {
        id:book,
        review:{
          user: userInfo._id,
          ReviewText:values.comment,
          ReviewDate:Date.now()
        }
        
      }
    )
    .unwrap()
  }

  useEffect(() => {
    if(response.isSuccess){
      toast.success("Review Added")
    }

    
 
  }, [response.isLoading])
  return (
    <form
    onSubmit={handleSubmit(onSubmitForm)} className='flex flex-col  items-center justify-center p-10 gap-3'>

  <input
   
        name="comment"
        type="text"
        placeholder="Add Review"
        {...register("comment", {
          required: {
            value: true,
            message: "You must enter your Comment",
          },
        })}
        className={` outline-none text-black m-0 border-0 focus:ring-0 w-full py-3 text-centerborder-0 bg-[#E2E8F0] rounded-xl   ${
          errors.comment ? "ring-2 ring-red-500" : null
        }`}
      />
                  <span className="text-red-400 text-sm py-2">
              {errors?.comment?.message}
            </span>
      <button 
      type='submit'
      disabled={!userInfo} 
      className='disabled:opacity-40 disabled:cursor-not-allowed bg-black text-white text-lg py-3 px-9 rounded-lg hover:scale-105 hover:bg-white hover:text-black  transform transition-all duration-500 ease-in-out'>
       {userInfo ? "Add Review" :"Login To Comment"}
      </button>
    </form>
  )
}
