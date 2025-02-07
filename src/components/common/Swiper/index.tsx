'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/swiper.css';

interface SwiperComponentProps {
  items: Element[];
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ items }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateNavigationButtons = (swiper) => {
    const prevButton = document.querySelector('.swiper-button-prev');
    const nextButton = document.querySelector('.swiper-button-next');

    if (swiper.isBeginning) {
      (prevButton as HTMLElement).style.display = 'none';
    } else {
      (prevButton as HTMLElement).style.display = 'block';
    }

    if (swiper.isEnd) {
      (nextButton as HTMLElement).style.display = 'none';
    } else {
      (nextButton as HTMLElement).style.display = 'block';
    }
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.update();
      updateNavigationButtons(swiperRef.current.swiper);
    }
  }, [items]);

  return (
    <div className="relative w-full">
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        spaceBetween={20}
        breakpoints={{
          1024: { slidesPerView: 4 }
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          updateNavigationButtons(swiper);
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="swiper-slide flex items-center justify-center transition-transform duration-300"
          >
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Navigation Buttons */}
      <button className="swiper-button-prev absolute left-0 z-10 hidden bg-black p-2 text-white"></button>
      <button className="swiper-button-next absolute right-0 z-10 hidden bg-black p-2 text-white"></button>
    </div>
  );
};

export default SwiperComponent;
