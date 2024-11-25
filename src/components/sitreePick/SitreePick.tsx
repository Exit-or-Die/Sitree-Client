'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const mockProjects = [
  {
    id: 1,
    name: 'Project Name',
    images: [
      'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg'
    ]
  },
  {
    id: 2,
    name: 'STEPIT',
    images: [
      'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg'
    ]
  },
  {
    id: 3,
    name: 'Trouble Painter',
    images: [
      'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg'
    ]
  },
  {
    id: 4,
    name: '일이삼사오육칠팔구십일...',
    images: [
      'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg'
    ]
  },
  {
    id: 5,
    name: '개미는툰툰',
    images: [
      'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg',
      'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg'
    ]
  }
];

const SitreePick = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);

  return (
    <div className="bg-white rounded-xl p-6 w-[954px]">
      <h2 className="text-lg font-bold">사이트리 PICK</h2>
      <div className="flex shadow">
        <div className="w-1/3 space-y-4 shadow">
          <ul className="space-y-4">
            {mockProjects.map((project, index) => (
              <li
                key={project.id}
                className={`flex items-center p-2 cursor-pointer rounded-lg ${
                  selectedProject.id === project.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="text-gray-500 text-sm w-8">{index + 1}</div>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {index === 1 ? (
                    <Image
                      src="/select.svg"
                      alt="Project Thumbnail"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="ml-4 flex flex-col">
                  <span className="text-sm font-medium truncate">{project.name}</span>
                  <span className="text-xs text-gray-400">♥ 000 조회수 000</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 flex items-center justify-center">
          {selectedProject.images.length > 0 ? (
            <Swiper spaceBetween={10} slidesPerView={1} className="w-full h-full">
              {selectedProject.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`Project ${selectedProject.name} Image ${index + 1}`}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-gray-500">No images available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SitreePick;
