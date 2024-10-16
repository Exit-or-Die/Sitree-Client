import { useState } from 'react';

import SImage from '../Image';

interface SelectProps {
  options: Array<string>;
  onSelect: (selected: string) => void;
  placeholder: string;
}

const SSelect = ({ options, onSelect, placeholder }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(placeholder);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        className="flex justify-between w-full border-2 border-green-500 rounded-md p-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <div className="w-4 h-4 flex-shrink-0">
          <SImage
            src="/arrow.svg"
            width={16}
            height={16}
            className={isOpen ? 'transform scale-y-[-1]' : ''}
          />
        </div>
      </button>
      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SSelect;
