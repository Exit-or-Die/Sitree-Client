'use client'
import React, { useState } from 'react';

import ProjectCategory from './ProjectCategory';
import ProjectList from './ProjectList';
import CategoryQueryOptions from '@/service/category/queries';

import { useQuery } from '@tanstack/react-query';
import { CategoriesData } from '@/service/category/CategoryService';

const ProjectGallery = () => {
  const allCategory = {
    categoryIds: [-1],
    categoryNames: '전체 보기'
  };
  const [selectedCategory, setSelectedCategory] = useState<CategoriesData>(allCategory);
  const { queryKey, queryFn } = CategoryQueryOptions.getGroupedCategories();

  const { data } = useQuery({ queryKey, queryFn });
  const categoriesData = [
    allCategory, 
    ...(data ?? []).map(group => ({
      categoryIds: group.map(category => category.categoryId),
      categoryNames: group.map(category => category.categoryName).join('/')
    }))
  ];

  const onClickCategory = (category: CategoriesData) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex">
      <ProjectCategory categoriesData={categoriesData} selectedCategory={selectedCategory} onClickCategory={onClickCategory} />
      <ProjectList selectedCategory={selectedCategory} />
    </div>
  );
};

export default ProjectGallery;
