'use client';

import { ProjectRegisterRequest } from '@/service/project/request';
import { Architecture } from '@/service/project/request';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import DynamicSEditor from '@/components/common/Editor/DynamicEditor';
import SImage from '@/components/common/Image';
import FileUploadButton from '@/components/custom/FileUploadButton';

interface TabType {
  id: number;
  label: string;
}

const tabs: Array<TabType> = [
  { id: 1, label: '프론트엔드' },
  { id: 2, label: '백엔드' },
  { id: 3, label: '인프라' },
  { id: 4, label: '데이터' },
  { id: 5, label: 'AI' },
  { id: 6, label: '기타' }
];

const ArchitectureComponent = () => {
  const { getValues, setValue } = useFormContext<ProjectRegisterRequest>();
  const [activeTab, setActiveTab] = useState(tabs[0]); // 초기 탭 설정
  const [tabContents, setTabContents] = useState<Architecture>();

  const architectureList = getValues('architectureList');

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleDescription = (contents: string) => {
    const updatedArchitectureList = (architectureList || []).map((architecture) => {
      if (architecture.architectureType === activeTab.label) {
        return {
          ...architecture,
          architectureDesc: contents
        };
      }

      return architecture;
    });

    // 새로운 항목이 없으면 추가하기
    const isTabExist = updatedArchitectureList.some(
      (architecture) => architecture.architectureType === activeTab.label
    );

    if (!isTabExist) {
      updatedArchitectureList.push({
        architectureType: activeTab.label,
        architectureDesc: contents,
        architectureImage: {
          imageType: 'ARCHITECTURE',
          imageUrl: ''
        }
      });
    }

    // setValue를 사용해 수정된 배열을 다시 설정
    setValue('architectureList', updatedArchitectureList);
  };

  const handleUpload = () => {};

  useEffect(() => {
    const foundTab = (architectureList || []).find(
      (architecture) => architecture.architectureType === activeTab.label
    );

    setTabContents(foundTab);
  }, [activeTab]);

  return (
    <div className="border-[1px] border-slate-90 rounded-2xlarge">
      <div className="bg-white-100 rounded-t-2xlarge px-10 pt-10 pb-5">
        <p className="text-xlarge font-lb tracking-[-0.48px]">개발 아키텍쳐</p>
      </div>
      <ul className="bg-white-100 flex gap-3 pt-4 px-10 border-b-[1px]">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`px-0.5 cursor-pointer hover:text-tree-50 text-small pb-3 tracking-[-0.14px] leading-5 text-slate-50 ${
              activeTab.id === tab.id
                ? 'font-bd text-tree-40 border-b-[1.6px] border-b-tree-50'
                : ''
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="bg-white-100 px-10 pt-5 pb-10 flex flex-col gap-5 rounded-b-2xlarge">
        <div>
          <p className="py-1 text-small leading-5 tracking-[-0.14px] text-slate-30">
            아키텍쳐 설명
          </p>
          <DynamicSEditor
            onChange={handleDescription}
            initialValue={tabContents?.architectureDesc}
            key={activeTab.id}
            placeholder="개발 아키텍쳐를 설명해 주세요"
          />
        </div>
        <div>
          <p className="py-1 text-small leading-5 tracking-[-0.14px] text-slate-30">
            아키텍쳐 이미지
          </p>
          {tabContents?.architectureImage ? (
            <div className="flex items-center bg-slate-98 rounded-large p-5">
              <SImage
                src={tabContents.architectureImage.imageUrl}
                width={422}
                height={184}
                defaultType="default"
              />
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
                  onUpload={handleUpload}
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
                onUpload={handleUpload}
              />
            </div>
          )}
        </div>
        <div className="ml-auto grow px-3 py-2">
          <button className="flex gap-1 items-center">
            <SImage src="/refresh.svg" width={16} height={16} alt="refresh" />
            <p className="text-slate-80 text-small">초기화</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureComponent;
