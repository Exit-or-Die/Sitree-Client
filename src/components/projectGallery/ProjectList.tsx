'use client';

import React, { useState } from 'react';
import { CategoriesData } from '@/service/category/CategoryService';

const projects = [
  {
    id: 1,
    name: 'Project Name',
    subText: 'Sub Text',
    image: '/path/to/image.png',
    likes: '000',
    views: '000',
    comments: '000',
    status: '운영중',
    focused: true,
    lastUpdated: '1일 전 수정됨'
  },
  ...Array(8).fill({
    id: null,
    name: 'Project Name',
    subText: 'Sub Text',
    image: null,
    likes: '000',
    views: '000',
    comments: '000',
    status: '운영중',
    focused: true,
    lastUpdated: '1일 전 수정됨'
  })
];

type Props = {
  selectedCategory: CategoriesData;
};

const ProjectList = ({ selectedCategory }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState('최신');
  const filterList = ['최신', '좋아요', '댓글', '조회수'];

  return (
    <div className="flex-1 w-[1064px] bg-white-100 rounded-3xl">
      <div className="pt-4 pl-5 flex justify-between items-center mb-4 border-b">
        <div className="flex text-sm h-[30px] text-gray-500">
          {filterList.map((filter) => (
            <div
              key={filter}
              className={`${
                selectedFilter === filter
                  ? 'text-green-600 font-medium border-b-2 border-green-600'
                  : ''
              } px-2 text-small cursor-pointer`}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
        <input 
          type="text" 
          placeholder="프로젝트 검색" 
          className="border p-2 rounded-lg text-sm w-60 outline-none"
        />
      </div>
      
      {/* Project Grid */}
      <div className="pl-5 grid grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-lg">
            {/* Project Header */}
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full">
                {/* {project.image ? (
                  <Image src={project.image} alt={project.name} width={32} height={32} />
                ) : null} */}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">{project.name}</h3>
                <p className="text-xs text-gray-400">{project.subText}</p>
              </div>
              {project.focused && <span className="ml-auto text-green-600 text-xs">✅ focused on</span>}
            </div>
            
            {/* Project Image */}
            <div className="w-full h-40 bg-gray-200 rounded-lg">
              {/* {project.image ? (
                <Image src={project.image} alt={project.name} layout="fill" />
              ) : null} */}
            </div>
            
            {/* Project Details */}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>🔍 {project.comments}</span>
              <span>♥ {project.likes}</span>
              <span>조회수 {project.views}</span>
            </div>
            
            {/* Project Status */}
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span className="text-green-500">● {project.status}</span>
              <span>{project.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
