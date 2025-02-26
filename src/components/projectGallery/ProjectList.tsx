'use client';

import { FILTER_CATEGORIES } from '@/constants/home';
import { CategoriesData } from '@/service/category/response';
import ProjectQueryOptions from '@/service/project/queries';
import { FilterCategory } from '@/service/project/request';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';

import SImage from '../common/Image';
import SInput from '../common/Input';
import ProjectCard from './ProjectCard';

type Props = {
  selectedCategory: CategoriesData;
};

const ProjectList = ({ selectedCategory }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState(FILTER_CATEGORIES[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!searchKeyword && !debouncedKeyword) return;
    setIsTyping(true);
    const timeout = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjects({
    sortType: selectedFilter.type,
    categoryIds: selectedCategory.categoryIds,
    nameKeyword: debouncedKeyword
  });

  const { data, isFetching } = useQuery({ queryKey, queryFn });

  const handleFilterChange = (filter: FilterCategory) => {
    if (selectedFilter.type === filter.type) return;

    setSelectedFilter(filter);
  };

  return (
    <div className="flex-1 w-[1050px] bg-white-100 rounded-3xl border border-slate-90">
      <div className="pl-5 flex justify-between items-center border-b">
        <div className="flex text-sm text-slate-50 pt-6 h-[52px]">
          {FILTER_CATEGORIES.map((filter) => (
            <div
              key={filter.type}
              className={`${
                selectedFilter.type === filter.type
                  ? 'text-green-600 font-medium border-b-2 border-green-600'
                  : ''
              } px-2 text-small cursor-pointer`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter.label}
            </div>
          ))}
        </div>
        <div className="flex items-center border-l pl-4 text-sm w-60 outline-none h-[52px] text-small">
          <SImage
            src="/magnifyGlass.svg"
            alt="magnify-glass"
            width={18}
            height={18}
            className="w-[18px] h-[18px] text-slate-60"
          />
          <SInput
            type="text"
            placeholder="프로젝트 검색"
            className="bg-transparent text-slate-40 w-full placeholder-slate-60 border-none focus:!ring-0 p-1"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="pl-3 grid grid-cols-3 gap-0 min-h-[600px] relative">
        {(isFetching || isTyping) && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        )}
        {!isFetching &&
          !isTyping &&
          data?.projectList.map((project, index) => (
            <ProjectCard
              key={index}
              projectId={project.projectId}
              thumbnail={project.thumbnail}
              name={project.name}
              shortDescription={project.shortDescription}
              backgroundImage={project.backgroundImage}
              commentCount={project.commentCount}
              likesCount={project.likeCount}
              viewCount={project.viewCount}
              isHealthy={project.isHealthy}
              latestUpdateTime={project.latestUpdateTime}
            />
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
