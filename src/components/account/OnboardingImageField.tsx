import { Maybe } from '@/utils/common';
import React from 'react';

import SImage from '@/components/common/Image';

import UploadFileButton from '../common/Button/UploadFileButton';

type Props = {
  image: Maybe<string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const OnboardingImageField = ({ image, handleChange }: Props) => {
  return (
    <div className="mb-6">
      <div className="block text-small font-md mb-2 text-slate-30">프로필 이미지</div>
      <div className="flex items-center">
        <div className="w-20 h-20 mr-4 rounded-full bg-slate-98 flex items-center justify-center overflow-hidden">
          {image ? (
            <SImage
              src={image}
              alt="Profile Image"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-slate-50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.125a9 9 0 0115 0"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col">
          <UploadFileButton handleChange={handleChange} />
          <div className="mt-2 text-xsmall text-slate-50">png 또는 jpg를 첨부해 주세요</div>
          <div className="mt-1 text-xsmall text-slate-60 font-md">최대 20mb, 권장 사이즈 80*80</div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingImageField;
