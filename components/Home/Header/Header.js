import React from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Header = () => {
    return (
        <div>
            <Swiper
                loop={true}
                grabCursor={true}
                slidesPerView={1}
                spaceBetween={10}
                slidesPerGroup={1}
                loopFillGroupWithBlank={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,

                }}
                // breakpoints={{
                //     640: {
                //         slidesPerView: 1,
                //         spaceBetween: 10,
                //     },
                //     768: {
                //         slidesPerView: 1,
                //         spaceBetween: 20,
                //     },
                //     1024: {
                //         slidesPerView: 1,
                //         spaceBetween: 30,
                //     },
                // }}
                navigation={{
                    clickable: true,
                }}

                modules={[Autoplay, Navigation]}
                className="w-[full]"
            >
                <SwiperSlide > <img src="https://i.ibb.co/jTCwXxD/car-11.jpg" alt="" className='w-full h-[30vw]' /> </SwiperSlide>
                <SwiperSlide > <img src="https://i.ibb.co/fXj21Rs/car-12.jpg" alt="" className='w-full h-[30vw]' /> </SwiperSlide>
                <SwiperSlide > <img src="https://i.ibb.co/jW82H1r/car-9.jpg" alt="" className='w-full h-[30vw]' /> </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Header;