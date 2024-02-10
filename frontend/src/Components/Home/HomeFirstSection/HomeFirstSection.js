import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Pagination,Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";

import 'swiper/css';
import SlideEl from './SlideEl';
import BookEl from './BookEl';
import { useGetRatedBooksQuery } from '../../../Services/Book.Service';
import Loader from '../../Loader';
import { motion } from 'framer-motion';

export default function HomeFirstSection() {
 
   const {
    data:books,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetRatedBooksQuery( {
    select:'_id name Summary CoverPic rating ',
    qt:3
   },{ refetchOnMountOrArgChange: true })
   const container = {
    hidden: { opacity: 0,height:'0' },
    show: {
      opacity: 1,
      height:'100%',
      transition: {
        staggerChildren: 0.5
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }


  return (

    (books   && !isFetching) ?
    <div className=' lg:grid lg:grid-cols-3   lg:px-10 xl:px-14  '>
      <motion.div 

      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1,
                     transition: {
                      ease: "easeInOut",
                       duration: 1.8
      }}}
      viewport={{ once: true }} 
      className='lg:col-span-2   bg-black rounded-l-xl shadow-xl shadow-black'>
      <Swiper 
      modules={[Navigation,Pagination,Autoplay]} 
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      spaceBetween={0}
      slidesPerView={1}
     /* onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}/*/
      className="rounded-l-xl    h-full"
    >
      {
        books.filter((item, index) => index < 3).map((el,i)=>(
        <SwiperSlide key={i} className=' h-full bg-no-repeat bg-contain bg-center flex flex-col justify-center items-center lg:justify-end lg:items-start '  style={{backgroundImage: `url(${el.CoverPic})`}}>
          <SlideEl  book={el}/>
        </SwiperSlide>
        ))
      }

      
        </Swiper>
      </motion.div> 

      <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
      className='flex flex-col gap-3 bg-gradient-to-b from-gray-700 via-gray-900 to-black/20  '>
        
      {
        books.filter((item, index) => index < 3).map((el,i)=>(
          <motion.div   key={i}  variants={item}  ><BookEl  book={el} /></motion.div >
          
        ))
      }
      </motion.div>
    </div>
  :  isFetching && <Loader  width={9} height={9} color={'text-white'} />
  );
};