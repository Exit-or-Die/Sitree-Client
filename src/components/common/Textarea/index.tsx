import React, { useState } from 'react';

interface TextareaProps {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number; // 최대 글자 수 설정
}

const STextarea = ({
  className = '',
  placeholder,
  value,
  onChange,
  maxLength = 1000
}: TextareaProps) => {
  const [currentLength, setCurrentLength] = useState(value?.length || 0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length); // 현재 글자 수 업데이트
    if (onChange) {
      onChange(e); // 외부 onChange 이벤트 호출
    }
  };

  return (
    <div className="relative bg-white rounded-lg">
      <textarea
        className={`px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tree-300 resize-none w-full h-60 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      {maxLength && (
        <div className="absolute bottom-3 right-2 text-xsmall text-slate-500">
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default STextarea;
