'use client';

import { uploadFile } from '@/utils/file';
import React, { useRef } from 'react';

import SImage from '@/components/common/Image';
import SButton from '@/components/common/Button';

type FileUploadButtonProps = {
  text: string;
  className?: string;
  iconName?: string;
  onUpload: (fileUrl: string) => void;
  accept?: string; // 허용할 확장자
};

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  text,
  className = '',
  iconName,
  onUpload,
  accept = '.jpg, .png' // 기본값 설정
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('file', file);
    if (file) {
      try {
        const fileUrl = await uploadFile(file);
        onUpload(fileUrl);
      } catch (error) {
        console.error('파일 업로드 실패:', error);
      } finally {
        event.target.value = '';
      }
    }
  };

  return (
    <div>
      <SButton
        type="button"
        className={`flex items-center gap-1 ${className}`}
        onClick={handleButtonClick}
      >
        {text}
        {iconName && <SImage src={iconName} width={16} height={16} />}
      </SButton>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploadButton;
