import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const InfiniteAutoplaySwipe = ({ data, Comp, number }) => {
  return (
    <div className="w-full   relative">
      <Swiper
        slidesPerView={number || 3}
        centeredSlides={true}
        spaceBetween={10}
        grabCursor={true}
        modules={[Pagination, Autoplay]}
        className=" w-full  "
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop
      >
        {data.map((item, index) => (
          <SwiperSlide
            key={index}
            className="  !flex !flex-col !items-center !justify-center  min-h-40"
          >
            {/* @ts-ignore */}
            <Comp item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfiniteAutoplaySwipe;
