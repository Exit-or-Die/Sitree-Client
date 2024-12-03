'use client';

import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  register?: UseFormRegister<T>;
  name?: string;
  accept?: string;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SInput = React.forwardRef<HTMLInputElement, InputProps<any>>(
  (
    { className = '', placeholder, value, onChange, name, register, type = 'text', accept },
    ref
  ) => {
    const {
      onChange: registerOnChange,
      ref: registerRef,
      ...restRegister
    } = register && name ? register(name) : { ref: undefined, onChange: undefined };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      [registerOnChange, onChange].forEach((fn) => {
        if (fn) {
          fn(e);
        }
      });
    };

    return (
      <input
        type={type}
        ref={registerRef || ref}
        className={`w-full p-3 border border-slate-90 rounded-base bg-white focus:outline-none focus:ring-1 focus:ring-tree-50 focus:outline-none ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        accept={accept}
        name={name}
        {...restRegister}
      />
    );
  }
);

SInput.displayName = 'SInput';

export default SInput;
