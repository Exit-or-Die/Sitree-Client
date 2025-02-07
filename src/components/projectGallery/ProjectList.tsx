'use client';

import { CategoriesData } from '@/service/category/CategoryService';
import ProjectQueryOptions from '@/service/project/queries';
import { SortType } from '@/service/project/request';
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';

import SImage from '../common/Image';
import SInput from '../common/Input';

type Props = {
  selectedCategory: CategoriesData;
};

const sortTypeMapping: Record<string, SortType> = {
  최신: 'LATEST',
  좋아요: 'LIKES',
  댓글: 'COMMENTS',
  조회수: 'VIEWS'
};

const ProjectList = ({ selectedCategory }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState('최신');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const filterList = ['최신', '좋아요', '댓글', '조회수'];

  useEffect(() => {
    if (!searchKeyword && !debouncedKeyword) return;
    setIsTyping(true);
    const timeout = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
      setIsTyping(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword]);

  const { queryKey, queryFn } = ProjectQueryOptions.retrieveProjects({
    sortType: sortTypeMapping[selectedFilter],
    categoryIds: selectedCategory.categoryIds,
    nameKeyword: debouncedKeyword
  });

  const { data, refetch, isFetching } = useQuery({ queryKey, queryFn });

  const handleFilterChange = (filter: string) => {
    if (selectedFilter === filter) return;

    setSelectedFilter(filter);
    refetch();
  };

  return (
    <div className="flex-1 w-[1050px] bg-white-100 rounded-3xl border border-slate-90">
      <div className="pl-5 flex justify-between items-center border-b">
        <div className="flex text-sm text-slate-50 pt-6 h-[52px]">
          {filterList.map((filter) => (
            <div
              key={filter}
              className={`${
                selectedFilter === filter
                  ? 'text-green-600 font-medium border-b-2 border-green-600'
                  : ''
              } px-2 text-small cursor-pointer`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
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
            <div key={index} className="bg-white pt-6 px-3 rounded-xl cursor-pointer w-[328px]">
              <div className="flex items-center mb-2">
                <div className="w-[40px] h-[40px] rounded-large overflow-hidden">
                  <SImage
                    src={project.thumbnail}
                    alt={`${project.name} Icon`}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-base font-bold max-w-[150px] whitespace-nowrap">
                    {project.name}
                  </h3>
                  <p className="text-xsmall text-gray-400 max-w-[150px] whitespace-nowrap">
                    {project.shortDescription}
                  </p>
                </div>
                <div className="flex ml-auto items-center">
                  <SImage src="/focused.svg" alt="focused on" width={16} height={16} />
                  <div className="ml-1 text-xsmall text-tree-40">focused on</div>
                </div>
              </div>

              <div className="w-[312px] h-[184px] overflow-hidden rounded-3xl">
                <SImage
                  src={project.backgroundImage}
                  alt={`Project ${project.name} Background`}
                  className="w-full h-full object-cover"
                  width={312}
                  height={184}
                />
              </div>

              <div className="flex text-xsmall text-gray-400 mt-4 pl-2 justify-between">
                <div className="flex">
                  <div className="flex items-center mr-2">
                    <SImage
                      src="/comment.svg"
                      width={12}
                      height={12}
                      alt="comment"
                      className="mr-[3px]"
                    />{' '}
                    <span className="text-slate-30">{project.commentCount}</span>
                  </div>
                  <div className="flex items-center mr-2">
                    <SImage
                      src="/like.svg"
                      width={12}
                      height={12}
                      alt="like"
                      className="mr-[3px]"
                    />
                    <span className="text-slate-30">{project.likesCount}</span>
                  </div>
                  <span className="text-slate-50">조회수 {project.viewCount}</span>
                </div>
                <div className="flex text-xs text-gray-400 items-center">
                  <SImage src="/alive.svg" alt="health-check" width={12} height={12} />
                  <span className="text-[13px] text-slate-30 text-md ml-1">운영중</span>
                </div>
              </div>

              <div className="pl-2 mt-1 text-xsmall text-slate-50 mb-4">1일 전 수정됨</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
