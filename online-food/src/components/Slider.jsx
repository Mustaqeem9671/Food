import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "../assests/css/swiperStyles.css";
// import "swiper/css/bundle";
import { useSelector } from 'react-redux';
import { SliderCard } from '../components';


const Slider = () => {
    const products = useSelector((state) => state.products);
    const [fruits, setfruits] = useState(null);

    useEffect(() => {
        setfruits(products?.filter((data) => data.product_category === "fruits"));
        console.log(fruits);
    },[ products]);

  return (
    <div className="w-full pt-24" >
 <Swiper
        slidesPerView={6}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
      
       
        className="mySwiper"
      >
        
       {fruits && 
       fruits.map((data, i) => 
       <SwiperSlide key={i} > 
       <SliderCard key={i} data={data} index={i} />
       </SwiperSlide> ) }
        
      </Swiper>
    </div>
  );
};

export default Slider;