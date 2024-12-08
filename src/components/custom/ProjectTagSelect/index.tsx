import isEqual from '@/utils/isEqual';
import React, { useEffect, useState, useCallback, useRef } from 'react';

import SButton from '@/components/common/Button';
import SImage from '@/components/common/Image';

interface ProjectTagSelectProps<T = { [key: string]: unknown }> {
  useDelete?: boolean;
  onChange?: (tags: T[]) => void;
  tags?: T[];
  displayKey?: keyof T;
  initialValue?: T[];
}

const ProjectTagSelect = <T,>({
  useDelete = true,
  onChange = () => {},
  tags = [],
  displayKey,
  initialValue = []
}: ProjectTagSelectProps<T>) => {
  const tagSelectRef = useRef<HTMLDivElement>(null);
  const [selectedTags, setSelectedTags] = useState<T[]>(initialValue);
  const [filteredTags, setFilteredTags] = useState<T[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const prevInitialValue = useRef<T[]>(initialValue);
  const prevSelectedTags = useRef<T[]>(selectedTags);

  const handleSelectTag = (tag: T) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleRemoveTag = (tag: T) => {
    setSelectedTags((prevTags) => prevTags.filter((selectedTag) => selectedTag !== tag));
  };

  const getTagDisplay = useCallback(
    (tag: T) => {
      return displayKey ? String(tag[displayKey]) : String(tag);
    },
    [displayKey]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagSelectRef.current && !tagSelectRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isEqual(initialValue, prevInitialValue.current)) {
      setSelectedTags(initialValue);
      prevInitialValue.current = initialValue;
    }
  }, [initialValue]);

  useEffect(() => {
    if (!isEqual(selectedTags, prevSelectedTags.current)) {
      onChange(selectedTags);
      prevSelectedTags.current = selectedTags;
    }
  }, [selectedTags, onChange]);

  useEffect(() => {
    setFilteredTags(tags.filter((tag) => !selectedTags.some((selected) => isEqual(selected, tag))));
  }, [tags, selectedTags]);

  return (
    <div className="relative w-full" ref={tagSelectRef}>
      <div
        className={`w-full border border-slate-90 rounded-[1rem] flex gap-2 items-center justify-between pr-3 cursor-pointer ${isDropdownOpen ? 'border-none outline-none ring-1 ring-tree-50' : ''}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {selectedTags.length > 0 ? (
          <div className="flex flex-wrap gap-2 px-2 py-1.5">
            {selectedTags.map((tag) => (
              <div key={getTagDisplay(tag)}>
                <SButton
                  size="md"
                  className="bg-tree-50 text-white-100 rounded-[99.9rem] gap-[0.4rem] py-[0.6rem] px-[0.8rem]"
                >
                  {getTagDisplay(tag)}
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
                key={getTagDisplay(tag)}
                onClick={() => handleSelectTag(tag)}
                className="rounded-[99.9rem] gap-[0.4rem] py-[0.6rem] text-slate-50 border-slate-90"
              >
                {getTagDisplay(tag)}
              </SButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTagSelect;
