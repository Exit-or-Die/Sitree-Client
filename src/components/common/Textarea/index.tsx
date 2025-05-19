'use client';

import React, { useState } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from 'react-hook-form';

interface TextareaProps<T extends FieldValues = FieldValues> {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  name?: Path<T>;
  register?: UseFormRegister<T>;
  registerOptions?: RegisterOptions<T>;
}

const STextarea = <T extends FieldValues = FieldValues>({
  className = '',
  placeholder,
  value,
  name,
  onChange,
  maxLength = 1000,
  register,
  registerOptions,
}: TextareaProps<T>) => {
  const [currentLength, setCurrentLength] = useState(value?.length || 0);

  // Safely get RHF registration
  const {
    onChange: registerOnChange,
    ref: registerRef,
    ...restRegister
  }: UseFormRegisterReturn | { ref?: undefined; onChange?: undefined } =
    register && name ? register(name, registerOptions) : {};

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCurrentLength(val.length);

    // Only trigger change events if under maxLength
    if (val.length <= maxLength) {
      [registerOnChange, onChange].forEach((fn) => {
        if (fn) fn(e);
      });
    }
  };

  return (
    <div className="flex flex-col gap-1.5 bg-white rounded-lg">
      <textarea
        ref={registerRef}
        className={`px-4 py-2 border border-slate-300 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-tree-300 resize-none w-full h-60 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        name={name}
        {...restRegister}
      />
      {maxLength && (
        <div className="text-xsmall text-right text-slate-60">
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default STextarea;
