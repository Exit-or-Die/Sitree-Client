'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const mockProjects = [
  {
    id: 1,
    name: '10분만',
    icon: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg',
    views: '42.9k',
    likes: '78.7k',
    comments: '9.64k',
    images: [
      'https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg'
    ]
  },
  {
    id: 2,
    name: 'Moring',
    icon: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg',
    views: '42.9k',
    likes: '32.8k',
    comments: '1.72k',
    images: [
      'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
    ]
  },
  {
    id: 3,
    name: 'SPOT!',
    icon: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg',
    views: '23.7k',
    likes: '98.2k',
    comments: '482',
    images: [
      'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
    ]
  },
  {
    id: 4,
    name: '일이삼사오육칠팔구십일...',
    icon: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg',
    views: '18.4k',
    likes: '67.2k',
    comments: '623',
    images: [
      'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
    ]
  },
  {
    id: 5,
    name: '개미는툰툰',
    icon: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg',
    views: '13.1k',
    likes: '39.1k',
    comments: '397',
    images: [
      'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
    ]
  }
];

const SitreePick = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const selectedRef = useRef(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (selectedRef.current) {
      setPosition(selectedRef.current.offsetTop);
    }
  }, [selectedProject]);

  return (
    <div className="flex-1 p-6 w-[954px]">
      <h2 className="text-xlarge font-bold mb-4">사이트리 PICK</h2>
      <div className="flex shadow-lg border rounded-3xl h-[396px]">
        <div className="relative w-1/3 space-y-2 pl-2 bg-white-100 rounded-l-3xl">
          <div
            className="absolute left-2 w-[95%] h-[60px] border bg-gray-100 rounded-lg shadow-lg transition-all duration-300"
            style={{ top: `${position}px` }}
          />
          <ul>
            {mockProjects.map((project) => (
              <li
                key={project.id}
                ref={selectedProject.id === project.id ? selectedRef : null}
                className="relative flex items-center p-3 cursor-pointer rounded-lg transition"
                onClick={() => setSelectedProject(project)}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <Image
                    src={project.icon}
                    alt={`${project.name} Icon`}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="ml-4 flex flex-col">
                  <span className="text-sm font-medium truncate">{project.name}</span>
                  <span className="text-xs text-gray-400 flex gap-2">
                    <span>
                      <Image src="/comment.svg" width={10} height={10} alt="comment" />{' '}
                      {project.comments}
                    </span>
                    <span>
                      <Image src="/like.svg" width={10} height={10} alt="like" /> {project.likes}
                    </span>
                    <span>조회수 {project.views}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3 flex items-center justify-center relative">
          {selectedProject.images.length > 0 ? (
            <Image
              src={selectedProject.images[0]}
              alt={`Project ${selectedProject.name} Background`}
              layout="fill"
              className="rounded-r-3xl object-cover"
            />
          ) : (
            <div className="text-gray-500">No images available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SitreePick;
