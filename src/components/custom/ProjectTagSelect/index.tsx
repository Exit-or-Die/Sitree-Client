import React, { useEffect, useState } from 'react';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';
import SvgIcon from '@/components/common/SVGIcon';

interface ProjectTagSelectProps<T = string> {
  useDelete?: boolean;
  onChange?: (tags: T[]) => void;
  tags: T[];
}

const ProjectTagSelect = <T,>({
  useDelete = true,
  onChange = () => {},
  tags
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
        className={`w-full border border-slate-90 rounded-[1rem] flex gap-2 items-center justify-between pr-3 cursor-pointer ${isDropdownOpen ? 'border-none outline-none ring-1 ring-tree-50' : ''}`}
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
          <SvgIcon
            icon="arrow"
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
