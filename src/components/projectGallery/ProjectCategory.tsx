'use client'
import React from 'react';
import { CategoriesData } from '@/service/category/CategoryService';
type Props = {
  categoriesData: Array<CategoriesData>
  selectedCategory: CategoriesData;
  onClickCategory: (category: CategoriesData) => void;
};

const ProjectCategory = ({ categoriesData, selectedCategory, onClickCategory }: Props) => {

  return (
    <div className="px-6 min-w-[192px]">
      <ul className="p-3 bg-white-100 space-y-2 rounded-2xl shadow-md">
        {categoriesData.map((category) => (
          <li
            key={category.categoryNames}
            className={`p-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 transition ${
              selectedCategory.categoryNames === category.categoryNames ? 'bg-gray-200' : ''
            }`}
            onClick={() => onClickCategory(category)}
          >
            {category.categoryNames}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCategory;
