'use client'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import './styles.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import Image from 'next/image';


// import required modules
import { EffectCards } from 'swiper/modules';

const EffCard = () => {
    return (
        <>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-gray-300 p-4 h-[30rem]"><p>Smartphones</p><Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="w-60 h-80 mt-12"
                >
                    <SwiperSlide className="flex items-center justify-center rounded-lg bg-red-700 text-white text-2xl font-bold">Slide 1</SwiperSlide>
  <SwiperSlide className="flex items-center justify-center rounded-lg bg-blue-600 text-white text-2xl font-bold">
    <a href='/about'>
    <Image src={'https://images.pexels.com/photos/25288209/pexels-photo-25288209/free-photo-of-a-building-with-two-windows-and-a-blue-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} layout="fill" /></a>
    </SwiperSlide>
  <SwiperSlide className="flex items-center justify-center rounded-lg bg-green-600 text-white text-2xl font-bold">Slide 3</SwiperSlide>
  <SwiperSlide className="flex items-center justify-center rounded-lg bg-orange-600 text-white text-2xl font-bold">Slide 4</SwiperSlide>
  <SwiperSlide className="flex items-center justify-center rounded-lg bg-green-800 text-white text-2xl font-bold">Slide 5</SwiperSlide>
  <SwiperSlide className="flex items-center justify-center rounded-lg bg-red-900 text-white text-2xl font-bold">Slide 6</SwiperSlide>
  <SwiperSlide className="flex items-center justify-center rounded-lg bg-green-900 text-white text-2xl font-bold">Slide 7</SwiperSlide>
  <SwiperSlide className="flex items-center justify-center rounded-lg bg-blue-800 text-white text-2xl font-bold">Slide 8</SwiperSlide>
  <SwiperSlide className="flex items-center justify-center rounded-lg bg-pink-700 text-white text-2xl font-bold">Slide 9</SwiperSlide>

                </Swiper></div>
                <div> <div class="flex justify-between items-center mb-3.5">
  <p class="">H</p>
  <button class="bg-blue-500 text-white py-2 px-4 rounded text-xs">Button</button>
</div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 h-[27rem]'>
                    
                <div class="bg-gray-300 p-4">Item 2</div>
                <div class="bg-gray-300 p-4">Item 3</div>
                <div class="bg-gray-300 p-4">Item 2</div>
                <div class="bg-gray-300 p-4">Item 3</div>
                </div>
                </div>
                <div class="p-4 h-[30rem] relative"><Image src={'https://images.pexels.com/photos/915051/pexels-photo-915051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} layout='fill'/>
                <p class="text-white text-center absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">Your Text Here</p>
                </div>
                {/* <div class="bg-gray-300 p-4">Item 3</div>
                <div class="bg-gray-300 p-4">Item 4</div>
                <div class="bg-gray-300 p-4">Item 5</div>
                <div class="bg-gray-300 p-4">Item 6</div> */}
            </div>

        </>
    )
}

export default EffCard