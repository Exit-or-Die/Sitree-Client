import React from 'react';

interface DropdownProps {
  list: string[];
  searchCount: number;
  onSelect: (suggestion: string) => void;
}

const Dropdown = ({ list, searchCount, onSelect }: DropdownProps) => {
  return (
    <div className="absolute mt-1 w-full bg-white-100 border border-slate-90 rounded-large shadow-lg z-10">
      <div className="px-4 pt-4 pb-2 text-sm text-gray-500 border-gray-200 text-[12px]">
        검색 결과
        <span className="font-bold text-slate-30"> {searchCount}</span>건
      </div>
      <ul className="max-h-48 overflow-y-auto">
        {list.map((item, index) => (
          <li
            key={index}
            className="px-4 py-2 text-[14px] text-gray-800 hover:bg-slate-95 hover:text-green-600 cursor-pointer"
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
