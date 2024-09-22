import React, { useEffect, useState } from 'react';

import SButton from '@/components/common/Button';

const tags = [
  '스포츠',
  '헬스케어',
  '지도',
  '여행',
  '이동',
  '자기계발',
  '생산성',
  '외국어',
  '교육',
  '게임',
  'AI',
  '금융',
  '라이프스타일',
  '소설',
  '커뮤니티',
  '아트',
  '디자인',
  '책',
  '만화',
  '데이트',
  '육아',
  '엔터테인먼트',
  '이벤트',
  '음식',
  '인테리어',
  '공간',
  '부동산',
  '의료',
  '뉴스',
  '음악',
  '사진',
  '영상',
  '쇼핑',
  '날씨',
  '플랫폼'
];

interface ProjectTagSelectProps {
  useDelete?: boolean;
  onChange?: (tag: any) => void;
}

const ProjectTagSelect = ({ useDelete = true, onChange = () => {} }: ProjectTagSelectProps) => {
  const [search, setSearch] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setSearch(''); // 태그 선택 후 검색 필드를 비움
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const filteredTags = tags.filter(
    (tag) => tag.toLowerCase().includes(search.toLowerCase()) && !selectedTags.includes(tag)
  );

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags, onChange]);

  return (
    <div className="relative w-full ">
      <div
        className="w-full border border-tree-50 rounded-lg px-4 py-2 flex flex-wrap items-center gap-[0.4rem] cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedTags.length > 0 ? (
          selectedTags.map((tag) => (
            <SButton
              key={tag}
              size="md"
              className="bg-tree-50 text-white-100 rounded-[99.9rem] gap-[0.4rem]"
            >
              {tag}
              {useDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트가 부모에게 전달되지 않도록 처리
                    handleRemoveTag(tag);
                  }}
                >
                  X
                </button>
              )}
            </SButton>
          ))
        ) : (
          <span className="text-gray-400">태그를 입력하세요</span>
        )}
      </div>
      {isDropdownOpen && filteredTags.length > 0 && (
        <div className="absolute z-10 bg-white-100 border border-gray-300 rounded-lg w-full mt-2 overflow-y-auto">
          <div className="flex flex-wrap p-2 gap-2">
            {filteredTags.map((tag) => (
              <SButton
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className="rounded-[99.9rem] gap-[0.4rem] py-[0.6rem] text-slate-50 border-slate-90"
              >
                {tag}
              </SButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTagSelect;
