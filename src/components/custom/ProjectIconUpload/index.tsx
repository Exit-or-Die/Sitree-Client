'use client';

import { ProjectRegisterRequest } from '@/service/project/request';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Nullable } from 'types/common';

import SImage from '@/components/common/Image';

import FileUploadButton from '../FileUploadButton';

const ProjectIconUpload = () => {
  const { setValue, getValues } = useFormContext<ProjectRegisterRequest>();
  const [iconUrl, setIconUrl] = useState<Nullable<string>>(null);

  useEffect(() => {
    const initialImage = getValues('head.thumbnailImageUrl') || '/EmptyImage.svg';
    setIconUrl(initialImage);
  }, [getValues]);

  const handleUpload = (fileUrl: string) => {
    setIconUrl(fileUrl);
    setValue('head.thumbnailImageUrl', fileUrl);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1 py-1">
        <p className="text-small font-sb leading-[1.8rem] tracking-[-0.14px]">프로젝트 아이콘</p>
        <span className="ml-1 mt-1 w-1.5 h-1.5 bg-tree-50 rounded-full"></span>
      </div>
      <div className="w-[24rem] border rounded-[1.2rem] border-slate-90 px-[2.4rem] pt-[2.4rem] pb-[2.4rem] flex flex-col items-center gap-[2.4rem]">
        <div className="w-[9.6rem] h-[9.6rem] p-[2.4rem] border rounded-[2.4rem] border-slate-95 flex items-center justify-center">
          <SImage src={iconUrl || '/blankImage.svg'} width={48} height={48} alt="project icon" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-[1.5rem] pb-[0.6rem] tracking-[-0.15px] text-slate-30">
            png 또는 jpg를 첨부해 주세요
          </p>
          <p className="text-[1.2rem] text-slate-60">최대 20mb, 권장 사이즈 80*80</p>
        </div>
        <FileUploadButton text="파일 선택" iconName="/fileUpload.svg" onUpload={handleUpload} />
      </div>
    </div>
  );
};

export default ProjectIconUpload;
