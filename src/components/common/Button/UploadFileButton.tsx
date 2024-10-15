import React, { useRef } from 'react';

import SButton from '.';
import SImage from '../Image';
import SInput from '../Input';

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
};

const UploadFileButton = ({ handleChange, accept = 'image/png, image/jpeg' }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div>
        <SButton
          className="cursor-pointer border border-slate-90 rounded-small text-slate-50 hover:bg-slate-95"
          size="sm"
          onClick={handleFileSelect}
        >
          <div className="mr-[4px] text-small">파일 선택</div>
          <SImage src="/select.svg" width={16} height={16} alt="select icon" />
        </SButton>
      </div>
      <SInput
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
        className="hidden"
        accept={accept}
      />
    </>
  );
};

export default UploadFileButton;
