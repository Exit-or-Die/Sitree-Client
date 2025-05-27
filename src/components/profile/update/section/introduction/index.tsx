'use client';

import { ProfileUpdateRequest } from '@/service/profile/request';
import { UserIntroField } from '@/service/profile/response';
import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import DynamicSEditor from '@/components/common/Editor/DynamicEditor';
import SInput from '@/components/common/Input';

import RegisterRequiredMark from '../../components/RegisterRequiredMark';

const ProfileSelfIntroForm = () => {
  const { setValue } = useFormContext<ProfileUpdateRequest>();
  const introForm = useWatch({ name: 'myPage.selfIntroduction' });

  const [intro, setIntro] = useState<UserIntroField>({
    title: introForm?.title || '',
    contents: introForm?.contents || ''
  });

  useEffect(() => {
    if (introForm?.title || introForm?.contents) {
      setIntro(introForm);
    }
  }, [introForm]);

  const updateIntro = (updatedIntro: UserIntroField) => {
    setIntro(updatedIntro);
    setValue('myPage.selfIntroduction', updatedIntro);
  };

  const handleInputChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateIntro({ ...intro, [name]: value });
  };

  const handleEditorChange = (value: string) => {
    updateIntro({ ...intro, contents: value });
  };

  return (
    <div className="bg-white-100 rounded-2xlarge p-10 border-[1px] border-slate-90">
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-10 font-lb text-xlarge">자기소개</p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-full">
            <div className="flex items-center">
              <p className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">제목</p>
              <RegisterRequiredMark />
            </div>
            <SInput
              key={intro.title}
              type="text"
              placeholder="나를 표현할 수 있는 한 줄을 입력해 주세요"
              name="title"
              value={intro.title || ''}
              onChange={(e) => handleInputChange('title', e)}
              className="mt-1.5 text-small leading-5 tracking-[-0.14px]"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <label className="text-small font-md text-slate-30 leading-5 tracking-[-0.14px]">
              내용
            </label>
            <RegisterRequiredMark />
          </div>
          <div className="mt-1.5">
            <DynamicSEditor
              placeholder="자기소개를 작성해 주세요"
              initialValue={intro.contents || ''}
              onChange={handleEditorChange}
              maxLength={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelfIntroForm;
