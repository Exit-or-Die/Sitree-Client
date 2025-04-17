'use client';

import { ProjectRegisterRequest } from '@/service/project/request';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Nullable } from 'types/common';

import SImage from '@/components/common/Image';
import { RegiseterErrorMessage } from '@/components/project/register/error/RegisterError';

import { ImageUploadSection } from '../ImageUploadSection';

const ProjectIconUpload = () => {
  const { setValue, getValues } = useFormContext<ProjectRegisterRequest>();
  const [iconUrl, setIconUrl] = useState<Nullable<string>>(null);

  const handleUpload = (fileUrl: string) => {
    setIconUrl(fileUrl);
    setValue('head.thumbnailImageUrl', fileUrl);
  };

  return (
    <>
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-1 py-1">
          <p className="text-small font-sb leading-[1.8rem] tracking-[-0.14px]">프로젝트 아이콘</p>
          <span className="mt-1 w-1.5 h-1.5 bg-tree-50 rounded-full"></span>
        </div>
        <div className="w-[24rem] border rounded-[1.2rem] border-slate-90 px-[2.4rem] pt-[2.4rem] pb-[2.4rem] flex flex-col items-center gap-[2.4rem]">
          <div
            className={`relative w-[9.6rem] h-[9.6rem] border rounded-[2.4rem] border-slate-95 flex items-center justify-center'}`}
          >
            <SImage
              key={iconUrl}
              src={iconUrl || '/blankImage.svg'}
              className={!iconUrl ? 'p-[2.4rem]' : ''}
              alt="project icon"
            />
          </div>
          <ImageUploadSection
            limitSize={20}
            recommendedSize={['80', '80']}
            buttonText="파일 선택"
            onUpload={handleUpload}
          />
        </div>
      </div>
      {iconUrl && !getValues('head.thumbnailImageUrl') && (
        <RegiseterErrorMessage errorKey="head.thumbnailImageUrl" />
      )}
    </>
  );
};

export default ProjectIconUpload;
