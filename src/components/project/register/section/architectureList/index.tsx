import SEditor from '@/components/common/Editor';
import React, { useState } from 'react';

const tabs = [
  { id: 1, label: '프론트엔드' },
  { id: 2, label: '작성중' },
  { id: 3, label: '백엔드' },
  { id: 4, label: '인프라' },
  { id: 5, label: '데이터' },
  { id: 6, label: 'AI' },
  { id: 7, label: '기타' }
];

const inputFields = [
  {
    id: 'frontend',
    label: '프론트엔드 설명',
    placeholder: '프론트엔드에 대한 설명을 입력하세요...'
  },
  { id: 'inProgress', label: '작성중 설명', placeholder: '작성중에 대한 설명을 입력하세요...' },
  { id: 'backend', label: '백엔드 설명', placeholder: '백엔드에 대한 설명을 입력하세요...' },
  { id: 'infrastructure', label: '인프라 설명', placeholder: '인프라에 대한 설명을 입력하세요...' },
  { id: 'data', label: '데이터 설명', placeholder: '데이터에 대한 설명을 입력하세요...' },
  { id: 'ai', label: 'AI 설명', placeholder: 'AI에 대한 설명을 입력하세요...' },
  { id: 'etc', label: '기타 설명', placeholder: '기타에 대한 설명을 입력하세요...' }
];

const ArchitectureComponent = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id); // 초기 탭 설정

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div>
      <div className="bg-white-100 rounded-t-2xlarge px-10 pt-10 pb-5">
        <p className="text-xlarge font-lb tracking-[-0.48px]">개발 아키텍쳐</p>
      </div>
      <ul className="bg-white-100 flex gap-3 pt-4 px-10 border-b-[1px] border-b-slate-90">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-0.5 cursor-pointer hover:text-tree-50 text-small pb-3 tracking-[-0.14px] leading-5 text-slate-50 ${
              activeTab === tab.id ? 'font-bd text-tree-40 border-b-[1.6px] border-b-tree-50' : ''
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="bg-white-100 px-10 pt-5 pb-10 flex flex-col gap-5">
        <div>
          <p className="py-1 text-small leading-5 tracking-[-0.14px]">아키텍쳐 설명</p>
          <SEditor initialValue="아키텍쳐 설명" onChange={() => {}} />
        </div>
        <div>
          <p className="py-1 text-small leading-5 tracking-[-0.14px]">아키텍쳐 이미지</p>
          <div className="bg-slate-98 rounded-large py-5 flex flex-col gap-2">
            <span>
              <p>png 또는 jpg를 첨부해 주세요</p>
              <p>최대 20mb, 권장 사이즈 1080 * 1080</p>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button className="px-6 py-2 bg-red-500 text-white rounded">초기화</button>
      </div>
    </div>
  );
};

export default ArchitectureComponent;
