'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '@/styles/swiper.css';

interface TabProps {
  items: string[];
  onChange: (item: string, index: number) => void;
  activeItem?: string;
}

const STab: React.FC<TabProps> = ({ items, onChange, activeItem = items[0] }) => {
  const [selected, setSelected] = useState(activeItem);

  const handleClick = (item: string, index: number) => {
    setSelected(item);
    onChange(item, index);
  };

  return (
    <div className="relative">
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        grabCursor={true}
        loop={false}
        onSlideChange={({ activeIndex }) => setSelected(items[activeIndex])}
        className="cursor-pointer border-b border-b-1 border-slate-90"
        style={{
          overflow: 'hidden'
        }}
      >
        {items.map((item, idx) => (
          <SwiperSlide key={item} className="flex justify-center" style={{ width: 'auto' }}>
            <div
              className={`pb-3 ${selected === item ? 'text-tree-40 font-bd border-b border-tree-40 border-b-[1.6px]' : 'text-slate-50 font-md'}`}
              onClick={() => handleClick(item, idx)}
            >
              {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right side gradient */}
      <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white opacity-50" />
    </div>
  );
};

export default STab;
