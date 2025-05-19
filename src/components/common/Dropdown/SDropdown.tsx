'use client';

import React, { useEffect, useState } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { Nullable } from 'types/common';

import SvgIcon from '../SVGIcon';

interface SDropdownProps<TOption = string, TForm extends FieldValues = FieldValues> {
  options: TOption[];
  onChange?: (selectedOption: Nullable<TOption>) => void;
  placeholder?: string;
  className?: string;
  label?: 'default' | 'bold' | 'none';
  name?: Path<TForm>;
  register?: UseFormRegister<TForm>;
  registerOptions?: RegisterOptions<TForm>;
}

const BORDER_STYLE_BY_LABEL = {
  default: 'border border-slate-90 rounded-[1rem]',
  bold: 'border border-slate-300 rounded-base',
  none: 'border-0 rounded-base',
};

const SDropdown = <TOption, TForm extends FieldValues = FieldValues>({
  options,
  onChange = () => {},
  placeholder = 'Select Option',
  className,
  label = 'default',
  register,
  name,
  registerOptions,
}: SDropdownProps<TOption, TForm>) => {
  const [selectedOption, setSelectedOption] = useState<Nullable<TOption>>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (option: TOption) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    onChange(option);
  };

  const registration = register && name ? register(name, registerOptions) : undefined;

  return (
    <div className={`relative w-full ${className}`}>
      {registration && (
        <input
          type="hidden"
          value={selectedOption ? String(selectedOption) : ''}
          {...registration}
        />
      )}
      <div
        className={`w-full ${BORDER_STYLE_BY_LABEL[label]} flex items-center justify-between pr-3 cursor-pointer ${
          isDropdownOpen ? 'ring-1 ring-tree-50' : ''
        }`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className={`p-3 text-small font-md leading-5 tracking-[-0.14px] text-slate-${!selectedOption ? '50' : '10'}`}>
          {selectedOption ? String(selectedOption) : placeholder}
        </span>
        <div className="w-4 h-4 flex-shrink-0">
          <SvgIcon
            icon="arrow"
            width={16}
            height={16}
            color="#959EB2"
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
