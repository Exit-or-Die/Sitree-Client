'use client';

import React, { useEffect, ReactNode, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/swiper.css';

interface SwiperComponentProps {
  items: Element[]; // 이미지나 children을 전달받기 위한 배열
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ items }) => {
  const swiperRef = useRef<SwiperRef | null>(null); // Swiper 인스턴스를 참조할 ref
  const [activeIndex, setActiveIndex] = useState(0); // 활성 슬라이드의 인덱스 상태 관리

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.update();
    }
  }, [items]);

  return (
    <div className="relative w-full">
      <Swiper
        ref={swiperRef} // Swiper 인스턴스를 참조
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        spaceBetween={20}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 }
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);

          const prevButton = document.querySelector('.swiper-button-prev');
          const nextButton = document.querySelector('.swiper-button-next');

          // 첫 번째 슬라이드에서 넘어갈 수 없도록 설정
          if (swiper.isBeginning) {
            (prevButton as HTMLElement).style.display = 'none'; // 첫 번째 슬라이드에서 이전 버튼 숨기기
          } else {
            (prevButton as HTMLElement).style.display = 'block';
          }

          // 마지막 슬라이드에서 넘어갈 수 없도록 설정
          if (swiper.isEnd) {
            (nextButton as HTMLElement).style.display = 'none'; // 마지막 슬라이드에서 다음 버튼 숨기기
          } else {
            (nextButton as HTMLElement).style.display = 'block';
          }
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
