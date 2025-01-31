'use client';

import React, { useState } from 'react';

import ProjectCategory from './ProjectCategory';
import ProjectList from './ProjectList';

const ProjectGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체 보기');

  const onClickCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex">
      <ProjectCategory selectedCategory={selectedCategory} onClickCategory={onClickCategory} />
      <ProjectList />
    </div>
  );
};

export default ProjectGallery;
