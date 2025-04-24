'use client';

import React, { useState } from 'react';

interface TextareaProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number; // 최대 글자 수 설정
  name?: string;
}

const STextarea = ({
  className = '',
  placeholder,
  value,
  name = '',
  onChange,
  maxLength = 1000
}: TextareaProps) => {
  const [currentLength, setCurrentLength] = useState(value?.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length); // 현재 글자 수 업데이트
    if (onChange && currentLength < maxLength) {
      onChange(e); // 외부 onChange 이벤트 호출
    }
  };

  return (
    <div className="flex flex-col gap-1.5 bg-white rounded-lg">
      <textarea
        className={`px-4 py-2 border border-slate-300 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-tree-300 resize-none w-full h-60 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        name={name}
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
