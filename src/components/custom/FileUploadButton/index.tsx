'use client';

import { uploadFile } from '@/utils/file';
import React, { useRef } from 'react';

import SButton from '@/components/common/Button';
import SvgIcon, { IconType } from '@/components/common/SVGIcon';

type FileUploadButtonProps = {
  text: string;
  className?: string;
  iconName?: IconType;
  limitSize?: number; // 파일 크기 제한 (MB 단위)
  onUpload: (fileUrl: string) => void;
  accept?: string; // 허용할 확장자
};

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  text,
  className = '',
  iconName,
  limitSize,
  onUpload,
  accept = '.jpg, .png' // 기본값 설정
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // limitSize 체크 (바이트로 변환: MB * 1024 * 1024)
    if (limitSize && file.size < limitSize * 1024 * 1024) {
      console.warn(`파일 크기 제한 ${limitSize}MB를 초과했습니다.`);
      event.target.value = '';

      return;
    }

    try {
      const fileUrl = await uploadFile(file);
      onUpload(fileUrl);
    } catch (error) {
      console.error('Error: 파일 업로드 실패:', error);
    } finally {
      event.target.value = '';
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
        {iconName && <SvgIcon icon={iconName} width={16} height={16} />}
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
