'use client';

import { Architecture } from '@/service/project/response';
import { extractContentFromHtml } from '@/utils/stringUtil';
import React from 'react';

import DynamicSEditor from '@/components/common/Editor/DynamicEditor';
import SImage from '@/components/common/Image';
import FileUploadButton from '@/components/custom/FileUploadButton';

import { getInitialArchitecture } from '.';

interface ArchitectureFormProps {
  label: string;
  description: string;
  imageUrl: string;
  updateArchitecture(update: Partial<Architecture>): void;
}

const ArchitectureForm = ({
  label,
  description,
  imageUrl,
  updateArchitecture
}: ArchitectureFormProps) => {
  const handleEditorChange = (value: string) => {
    if (!extractContentFromHtml(value).length) {
      return;
    }
    updateArchitecture({ architectureDesc: value });
  };

  const handleImageUpload = (imageUrl: string) => {
    updateArchitecture({
      architectureImage: { imageType: 'ARCHITECTURE', imageUrl }
    });
  };

  const resetArchitecture = () => {
    const resetContent = getInitialArchitecture(label);
    updateArchitecture(resetContent);
  };

  return (
    <div>
      <div className="bg-white-100 px-10 pt-5 pb-10 flex flex-col gap-5 rounded-b-2xlarge">
        <div>
          <p className="py-1 text-small leading-5 tracking-[-0.14px] text-slate-30">
            아키텍쳐 설명
          </p>
          <DynamicSEditor
            onChange={handleEditorChange}
            initialValue={description}
            placeholder="개발 아키텍쳐를 설명해 주세요"
            key={label}
          />
        </div>
        <div>
          <p className="py-1 text-small leading-5 tracking-[-0.14px] text-slate-30">
            아키텍쳐 이미지
          </p>
          {imageUrl.length > 0 ? (
            <div className="flex flex-col md:flex-row items-center bg-slate-98 rounded-large p-5">
              <div className="relative w-[42.2rem] h-[18.4rem]">
                <SImage key={imageUrl} src={imageUrl} defaultType="default" alt="아키텍쳐 이미지" />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-2 px-5">
                <div className="flex flex-col justify-center items-center">
                  <p className="text-[1.5rem] pb-[0.6rem] tracking-[-0.15px] text-slate-30">
                    png 또는 jpg를 첨부해 주세요
                  </p>
                  <p className="text-[1.2rem] text-slate-60">최대 20mb, 권장 사이즈 80*80</p>
                </div>
                <FileUploadButton
                  text="이미지 변경"
                  className="bg-white-100"
                  iconName="/fileUpload.svg"
                  onUpload={handleImageUpload}
                />
              </div>
            </div>
          ) : (
            <div className="bg-slate-98 rounded-large py-5 flex flex-col items-center gap-2">
              <SImage src="/EmptyImage.svg" width={48} height={48} alt="project icon" />
              <div className="flex flex-col justify-center items-center">
                <p className="text-[1.5rem] pb-[0.6rem] tracking-[-0.15px] text-slate-30">
                  png 또는 jpg를 첨부해 주세요
                </p>
                <p className="text-[1.2rem] text-slate-60">최대 20mb, 권장 사이즈 80*80</p>
              </div>
              <FileUploadButton
                text="파일 선택"
                iconName="/fileUpload.svg"
                onUpload={handleImageUpload}
              />
            </div>
          )}
        </div>
        <div className="ml-auto grow px-3 py-2">
          <button className="flex gap-1 items-center" onClick={resetArchitecture}>
            <SImage src="/refresh.svg" width={16} height={16} alt="refresh" />
            <p className="text-red-50 text-small">초기화</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureForm;
