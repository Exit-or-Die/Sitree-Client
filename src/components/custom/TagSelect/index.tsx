import React, { useState } from 'react';

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

const TagSelect = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // 태그 선택 함수
  const handleSelectTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 태그 삭제 함수
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  // 필터링된 태그 리스트 (선택된 태그 제외)
  const filteredTags = tags.filter(
    (tag) => tag.toLowerCase().includes(search.toLowerCase()) && !selectedTags.includes(tag)
  );

  return (
    <div className="relative w-full">
      {/* 검색 및 태그 선택 필드 */}
      <input
        type="text"
        placeholder="프로젝트 태그"
        className="w-full border border-green-500 rounded-lg p-2"
        value={search}
        onFocus={() => setIsDropdownOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 선택된 태그 표시 */}
      <div className="flex flex-wrap mt-2 gap-2">
        {selectedTags.map((tag) => (
          <div
            key={tag}
            className="bg-green-500 text-white px-4 py-2 rounded-full text-sm flex items-center"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 bg-white text-green-500 rounded-full w-4 h-4 flex justify-center items-center"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 태그 리스트 드롭다운 */}
      {isDropdownOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-lg w-full mt-2 max-h-64 overflow-y-auto">
          <div className="flex flex-wrap p-2 gap-2">
            {filteredTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700 border"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelect;
