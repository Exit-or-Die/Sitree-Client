import React, { useState } from 'react';

import SEditor from '@/components/common/Editor';
import SImage from '@/components/common/Image';

const tabs = [
  { id: 1, label: '프론트엔드' },
  { id: 2, label: '백엔드' },
  { id: 3, label: '인프라' },
  { id: 4, label: '데이터' },
  { id: 5, label: 'AI' },
  { id: 6, label: '기타' }
];

const ArchitectureComponent = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id); // 초기 탭 설정

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className="border-[1px] border-slate-90 rounded-2xlarge">
      <div className="bg-white-100 rounded-t-2xlarge px-10 pt-10 pb-5">
        <p className="text-xlarge font-lb tracking-[-0.48px]">개발 아키텍쳐</p>
      </div>
      <ul className="bg-white-100 flex gap-3 pt-4 px-10 border-b-[1px]">
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
      <div className="bg-white-100 px-10 pt-5 pb-10 flex flex-col gap-5 rounded-b-2xlarge">
        <div>
          <p className="py-1 text-small leading-5 tracking-[-0.14px]">아키텍쳐 설명</p>
          <SEditor onChange={() => {}} placeholder="개발 아키텍쳐를 설명해 주세요" />
        </div>
        <div>
          <p className="py-1 text-small leading-5 tracking-[-0.14px]">아키텍쳐 이미지</p>
          <div className="bg-slate-98 rounded-large py-5 flex flex-col items-center gap-2 ">
            <SImage src="/EmptyImage.svg" width={48} height={48} alt="project icon" />
            <div className="flex flex-col justify-center items-center">
              <p className="text-[1.5rem] pb-[0.6rem] tracking-[-0.15rem]">
                png 또는 jpg를 첨부해 주세요
              </p>
              <p className="text-[1.2rem] text-slate-60">최대 20mb, 권장 사이즈 80*80</p>
            </div>
            <div>파일 선택</div>
          </div>
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
