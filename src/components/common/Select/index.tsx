import React, { useState, useRef, useEffect } from 'react';
import { Optional } from 'types/common';

import SvgIcon from '../SVGIcon';

interface SSelectProps<T = { [key: string]: unknown }> {
  value?: T;
  onChange: (value: T) => void;
  options: T[];
  displayKey?: keyof T;
  selectClass?: string;
  optionClass?: string;
  placeholder?: string;
}

const SSelect = <T,>({
  value,
  onChange,
  options,
  displayKey,
  selectClass = '',
  optionClass = '',
  placeholder = 'Select an option'
}: SSelectProps<T>) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getOptionDisplay = (option: Optional<T>) => {
    return option && displayKey ? String(option[displayKey] ?? '') : String(option ?? '');
  };

  const handleSelect = (option: T) => {
    onChange(option);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 현재 선택된 값을 제외한 옵션 목록
  const filteredOptions = options.filter(
    (option) => getOptionDisplay(option) !== getOptionDisplay(value)
  );

  return (
    <div
      ref={dropdownRef}
      className={`relative bg-white-100 text-small font-md leading-5 tracking-[-0.14px] ${selectClass}`}
    >
      <div
        className={`border border-slate-90 rounded-[1rem] p-3 cursor-pointer flex justify-between items-center ${isDropdownOpen ? 'border-none outline-none ring-1 ring-tree-50' : ''} ${selectClass}`}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{value && getOptionDisplay(value) ? getOptionDisplay(value) : placeholder}</span>
        <div className="w-4 h-4 flex-shrink-0">
          <SvgIcon
            icon="arrow"
            width={16}
            height={16}
            className={isDropdownOpen ? 'transform scale-y-[-1]' : ''}
          />
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1.5 w-full bg-white-100 border rounded-base shadow-md max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className={`p-3 cursor-pointer hover:bg-slate-95 ${optionClass}`}
            >
              {getOptionDisplay(option)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SSelect;
