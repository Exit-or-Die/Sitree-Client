import React from 'react';

const AffiliationRanking = () => {
  return (
    <div className="bg-white rounded-xl min-w-[302px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">소속 랭킹</h2>
        <button className="text-sm text-gray-500 hover:underline">전체 보기</button>
      </div>
      <div className="p-6 shadow">
        <div className="flex space-x-4 border-b pb-2 text-sm text-gray-500">
          <button className="text-green-600 font-medium border-b-2 border-green-600">전체</button>
          <button>회사</button>
          <button>대학교</button>
          <button>고등학교</button>
        </div>
        <ul className="space-y-4 mt-4">
          {[...Array(6)].map((_, index) => (
            <li key={index} className="flex items-center">
              <div className="text-gray-500 text-sm w-8">{index + 1}</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                å
                <img src="/path/to/logo" alt="Affiliation Logo" className="object-cover" />
              </div>
              <div className="ml-4 flex-grow">
                <span className="text-sm font-medium">Affiliation Name</span>
                <span className="text-xs text-gray-400 block">000 개 프로젝트</span>
              </div>
              <div className="text-sm text-red-600">000 ▲</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AffiliationRanking;
