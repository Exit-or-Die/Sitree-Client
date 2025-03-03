import React, { useEffect, useState } from 'react';
import { Nullable } from 'types/common';

import SImage from '@/components/common/Image';

interface SDropdownProps<T = string> {
  options: T[];
  onChange?: (selectedOption: Nullable<T>) => void;
  placeholder?: string;
  className?: string;
}

const SDropdown = <T,>({
  options,
  onChange = () => {},
  placeholder = 'Select Option',
  className
}: SDropdownProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<Nullable<T>>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (option: T) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    onChange(selectedOption);
  }, [selectedOption, onChange]);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className={`w-full border border-slate-90 rounded-[1rem] flex items-center justify-between pr-3 cursor-pointer ${isDropdownOpen ? 'ring-1 ring-tree-50' : ''}`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="p-3 text-small font-md leading-5 tracking-[-0.14px] text-slate-50">
          {selectedOption ? String(selectedOption) : placeholder}
        </span>
        <div className="w-4 h-4 flex-shrink-0">
          <SImage
            src="/arrow.svg"
            width={16}
            height={16}
            className={isDropdownOpen ? 'transform scale-y-[-1]' : ''}
          />
        </div>
      </div>
      {options.length > 0 && isDropdownOpen && (
        <div className="absolute z-10 bg-white-100 border border-gray-300 rounded-lg w-full mt-2">
          <div className="flex flex-col gap-1 p-2">
            {options.map((option) => (
              <span
                key={String(option)}
                onClick={() => handleSelectOption(option)}
                className="w-full text-left p-1.5 text-small font-md leading-5 tracking-[-0.14px] cursor-pointer hover:text-tree-50"
              >
                {String(option)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SDropdown;
