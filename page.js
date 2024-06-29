'use client'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image'

const Slider = () => {
    return (
        <div>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={15}  // Adjust the space between slides
                // slidesPerView={5}  // Initially, show 1 slide (single image) on small screens
                // centeredSlides={true}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                    576: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    600: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    700: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                      },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 20,
                    },
                  }}
                className="mt-5"
            >
                <div className='text-center'>
                    <SwiperSlide>
                        <div className="swiper-inner">
                            <Image src="https://images.pexels.com/photos/7319273/pexels-photo-7319273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={2250}
                                height={1390} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-inner">
                            <Image src='https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' width={2250}
                                height={1390} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-inner">
                            <Image src="https://images.pexels.com/photos/7319273/pexels-photo-7319273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={2250}
                                height={1390} />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-inner">
                            <Image src='https://images.pexels.com/photos/4050289/pexels-photo-4050289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' width={2250}
                                height={1390} />
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-inner">
                            <Image src='https://images.pexels.com/photos/3779747/pexels-photo-3779747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' width={2250}
                                height={1390} />
                        </div>

                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="swiper-inner">
                            <Image src="https://images.pexels.com/photos/7319273/pexels-photo-7319273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={2250}
                                height={1390} />
                        </div>
                    </SwiperSlide>

                </div>

            </Swiper>
        </div>

    )
}

export default Slider