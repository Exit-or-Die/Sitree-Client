'use client';

import { ALL } from '@/constants/home';
import CategoryQueryOptions from '@/service/category/queries';
import { CategoriesData, CategoryData } from '@/service/category/response';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

import ProjectCategory from './ProjectCategory';
import ProjectList from './ProjectList';

const ProjectGallery = () => {
  const allCategory = {
    categoryIds: [],
    categoryNames: ALL
  };
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<CategoriesData>(allCategory);
  const { queryKey } = CategoryQueryOptions.getGroupedCategories();
  const data = queryClient.getQueryData<Array<Array<CategoryData>>>(queryKey);
  const categoriesData = [
    allCategory,
    ...(data ?? []).map((group) => ({
      categoryIds: group.map((category) => category.categoryId),
      categoryNames: group.map((category) => category.categoryName).join('/')
    }))
  ];

  const onClickCategory = (category: CategoriesData) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex mb-4">
      <ProjectCategory
        categoriesData={categoriesData}
        selectedCategory={selectedCategory}
        onClickCategory={onClickCategory}
      />
      <ProjectList selectedCategory={selectedCategory} />
    </div>
  );
};

export default ProjectGallery;
