'use client';

import React from 'react';

const categories = [
  '전체 보기',
  '자기개발/생산성/교육/AI',
  '소셜/커뮤니티/플랫폼',
  '스포츠/헬스케어/의료',
  '아트/디자인/책/만화',
  '육아/데이트/이벤트',
  '지도/이동/여행',
  '음악/사진/영상',
  '게임/엔터테인먼트',
  '금융/라이프스타일',
  '공간/인테리어',
  '뉴스/날씨',
  '음식/쇼핑'
];

type Props = {
  selectedCategory: string;
  onClickCategory: (category: string) => void;
};

const ProjectCategory = ({ selectedCategory, onClickCategory }: Props) => {
  return (
    <div className="w-1/4 p-4 bg-white-100 rounded-xl shadow-md min-w-[192px]">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className={`p-3 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100 transition ${
              selectedCategory === category ? 'bg-gray-200' : ''
            }`}
            onClick={() => onClickCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectCategory;
