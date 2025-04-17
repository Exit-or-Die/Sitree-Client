'use client';

import { Architecture } from '@/service/project/response';
import React, { useState } from 'react';

import DynamicSEditor from '@/components/common/Editor/DynamicEditor';
import SImage from '@/components/common/Image';
import SvgIcon from '@/components/common/SVGIcon';
import { ImageUploadSection } from '@/components/custom/ImageUploadSection';

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
  const [resetCount, setResetCount] = useState(0);

  const handleEditorChange = (value: string) => {
    updateArchitecture({ architectureDesc: value });
  };

  const handleImageUpload = (imageUrl: string) => {
    updateArchitecture({
      architectureImage: { imageType: 'ARCHITECTURE', imageUrl }
    });
  };

  const resetArchitecture = () => {
    const resetContent = getInitialArchitecture(label);
    setResetCount((prev) => prev + 1);
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
            key={`${label}_${resetCount}`}
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
              <ImageUploadSection
                limitSize={20}
                recommendedSize={['1080', '1080']}
                buttonText="이미지 변경"
                onUpload={handleImageUpload}
              />
            </div>
          ) : (
            <div className="bg-slate-98 rounded-large py-5 flex flex-col items-center gap-2">
              <SImage src="/EmptyImage.svg" width={48} height={48} alt="project icon" />
              <ImageUploadSection
                limitSize={20}
                recommendedSize={['1080', '1080']}
                buttonText="파일 선택"
                onUpload={handleImageUpload}
              />
            </div>
          )}
        </div>
        <div className="ml-auto grow px-3 py-2">
          <div className="flex gap-1 items-center cursor-pointer" onClick={resetArchitecture}>
            <SvgIcon icon="refresh" width={16} height={16} color="#F6424E" />
            <p className="text-red-50 text-small">초기화</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureForm;
