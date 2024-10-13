'use client';

import React from 'react';

interface InputProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'file';
  refValue?: React.RefObject<HTMLInputElement>;
}

const SInput = ({
  className = '',
  placeholder,
  value,
  onChange,
  type = 'text',
  refValue
}: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      ref={refValue}
      type={type}
      className={`px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-tree-300 ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default SInput;
