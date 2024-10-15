import React, { useEffect, useState } from 'react';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

const EXAMPLE_TAGS = [
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

interface ProjectTagSelectProps<T = string> {
  useDelete?: boolean;
  onChange?: (tags: T[]) => void;
  tags?: T[];
}

const ProjectTagSelect = <T,>({
  useDelete = true,
  onChange = () => {},
  tags = EXAMPLE_TAGS as T[]
}: ProjectTagSelectProps<T>) => {
  const [selectedTags, setSelectedTags] = useState<T[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectTag = (tag: T) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (tag: T) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const filteredTags = tags.filter((tag) => !selectedTags.includes(tag));

  useEffect(() => {
    onChange(selectedTags);
  }, [selectedTags, onChange]);

  return (
    <div className="relative w-full">
      <div
        className="w-full border border-tree-50 rounded-[1rem] flex gap-2 items-center justify-between pr-3 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedTags.length > 0 ? (
          <div className="flex flex-wrap gap-2 px-2 py-1.5">
            {selectedTags.map((tag) => (
              <div key={String(tag)}>
                <SButton
                  size="md"
                  className="bg-tree-50 text-white-100 rounded-[99.9rem] gap-[0.4rem] py-[0.6rem] px-[0.8rem]"
                >
                  {String(tag)}
                  {useDelete && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(tag);
                      }}
                    >
                      <SImage src="/close-white.svg" width={14} height={14} />
                    </span>
                  )}
                </SButton>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 p-3 text-small">태그를 입력하세요</span>
        )}
        <div className="w-4 h-4 flex-shrink-0">
          <SImage
            src="/arrow.svg"
            width={16}
            height={16}
            className={isDropdownOpen ? 'transform scale-y-[-1]' : ''}
          />
        </div>
      </div>
      {isDropdownOpen && filteredTags.length > 0 && (
        <div className="absolute z-10 bg-white-100 border border-gray-300 rounded-lg w-full mt-2 overflow-y-auto">
          <div className="flex flex-wrap p-2 gap-2">
            {filteredTags.map((tag) => (
              <SButton
                key={String(tag)}
                onClick={() => handleSelectTag(tag)}
                className="rounded-[99.9rem] gap-[0.4rem] py-[0.6rem] text-slate-50 border-slate-90"
              >
                {String(tag)}
              </SButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTagSelect;
