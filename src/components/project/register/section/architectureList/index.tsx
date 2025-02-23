'use client';

import { ProjectRegisterRequest } from '@/service/project/request';
import { Architecture } from '@/service/project/response';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import ArchitectureForm from './ArchitectureForm';

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

export const getInitialArchitecture = (tabLabel: string): Architecture => ({
  architectureType: tabLabel,
  architectureDesc: '',
  architectureImage: {
    imageType: 'ARCHITECTURE',
    imageUrl: ''
  }
});

const ArchitectureComponent = () => {
  const { getValues, setValue } = useFormContext<ProjectRegisterRequest>();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [tabContents, setTabContents] = useState<Architecture>(
    getInitialArchitecture(tabs[0].label)
  );

  const architectureList = getValues('architectureList') || [];

  const getSortedArchitectureList = (): Architecture[] => {
    return tabs.map((tab) => {
      const existing = architectureList.find((arch) => arch.architectureType === tab.label);

      return existing || getInitialArchitecture(tab.label);
    });
  };

  const handleTabClick = (tab: TabType, event: React.MouseEvent) => {
    event.preventDefault(); // 페이지 리로드 방지
    setActiveTab(tab);
  };

  const updateArchitectureList = (updatedArchitecture: Architecture) => {
    const sortedList = getSortedArchitectureList();
    const updatedList = sortedList.map((arch) =>
      arch.architectureType === activeTab.label ? updatedArchitecture : arch
    );

    const filteredList = updatedList.filter(
      (arch) => arch.architectureDesc || arch.architectureImage.imageUrl
    );
    setValue('architectureList', filteredList);
  };

  const updateArchitecture = (update: Partial<Architecture>) => {
    const updatedArchitecture: Architecture = {
      ...tabContents,
      ...update,
      architectureType: activeTab.label
    };
    setTabContents(updatedArchitecture);
    updateArchitectureList(updatedArchitecture);
  };

  useEffect(() => {
    const sortedList = getSortedArchitectureList();
    const foundTab =
      sortedList.find((architecture) => architecture.architectureType === activeTab.label) ||
      getInitialArchitecture(activeTab.label);

    setTabContents(foundTab);
  }, [activeTab, architectureList]);

  return (
    <div className="border-[1px] border-slate-90 rounded-2xlarge">
      <div className="bg-white-100 rounded-t-2xlarge px-10 pt-10 pb-5">
        <p className="text-xlarge font-lb tracking-[-0.48px]">개발 아키텍쳐</p>
      </div>
      <ul className="bg-white-100 flex gap-3 pt-4 px-10 border-b-[1px]">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={(e) => handleTabClick(tab, e)}
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
      <ArchitectureForm
        label={tabContents.architectureType}
        description={tabContents.architectureDesc}
        imageUrl={tabContents.architectureImage.imageUrl}
        updateArchitecture={updateArchitecture}
      />
    </div>
  );
};

export default ArchitectureComponent;
