'use client';

import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import SImage from '../Image';

interface InputProps<T extends FieldValues> {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  register?: UseFormRegister<T>;
  name?: string;
  accept?: string;
  iconName?: string; // 아이콘 이름을 받는 props 추가
  onEnterPress?: (contents: string) => void; // 엔터 키 눌렀을 때 실행할 함수 추가
  onIconClick?: (contents: string) => void; // 아이콘 클릭 시 실행할 함수 추가
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
const SInput = React.forwardRef<HTMLInputElement, InputProps<any>>(
  (
    {
      className = '',
      placeholder,
      value,
      onChange,
      name,
      register,
      type = 'text',
      accept,
      iconName,
      onEnterPress,
      onIconClick
    },
    ref
  ) => {
    const {
      onChange: registerOnChange,
      ref: registerRef,
      ...restRegister
    } = register && name ? register(name) : { ref: undefined, onChange: undefined };

    const [text, setText] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      [registerOnChange, onChange].forEach((fn) => {
        if (fn) {
          fn(e);
        }
      });
      setText(e.target.value);
    };

    // 엔터 키 눌렀을 때 처리
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onEnterPress) {
        onEnterPress(text);
      }
    };

    // 아이콘 클릭 이벤트 처리
    const handleIconClick = () => {
      if (onIconClick) {
        onIconClick(text);
      }
    };

    return (
      <div className={`relative`}>
        <input
          type={type}
          ref={registerRef || ref}
          className={`w-full p-3 pr-10 border border-slate-300 rounded-base bg-white focus:outline-none focus:ring-2 focus:ring-tree-300 ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 추가
          accept={accept}
          {...restRegister}
        />
        {iconName && (
          <SImage
            src={`/${iconName}.svg`} // 아이콘 파일 경로 예시
            alt={iconName}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            width={24}
            height={24}
            onClick={handleIconClick} // 아이콘 클릭 이벤트 추가
          />
        )}
      </div>
    );
  }
);

SInput.displayName = 'SInput';

export default SInput;
