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

  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <div className="header">
        <h1 className="text-4xl font-bold">개발 아키텍쳐</h1>
        <ul className="flex space-x-4 mt-4 border-b-2">
          {tabs.map((tab) => (
            <li key={tab.id} className="cursor-pointer hover:text-blue-500">
              <a
                onClick={() => handleTabClick(tab.id)}
                className={activeTab === tab.id ? 'font-bold' : ''}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Input Form Section */}
      <div className="editor mt-6">
        {inputFields.map(
          (field, index) =>
            activeTab === index + 1 && (
              <div key={field.id}>
                <label htmlFor={field.id} className="text-xl font-semibold">
                  {field.label}
                </label>
                <textarea
                  id={field.id}
                  className="w-full h-64 border p-4"
                  placeholder={field.placeholder}
                ></textarea>
              </div>
            )
        )}
      </div>

      {/* Image Upload Section */}
      <div className="image-upload mt-6">
        <label className="text-xl font-semibold">아키텍쳐 이미지</label>
        <div className="border-2 border-dashed border-gray-400 p-4 mt-4 text-center">
          <p className="text-gray-500">png 또는 jpg를 첨부해 주세요</p>
          <p className="text-sm text-gray-400">최대 20mb, 권장 사이즈 1080x1080</p>
          <button className="mt-4 px-6 py-2 bg-gray-200 rounded">파일 선택</button>
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-6 text-right">
        <button className="px-6 py-2 bg-red-500 text-white rounded">초기화</button>
      </div>
    </div>
  );
};

export default ArchitectureComponent;
