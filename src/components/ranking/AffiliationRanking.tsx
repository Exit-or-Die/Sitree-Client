import Image from 'next/image';
import React, { useState } from 'react';

const mockData = [
  {
    id: 1,
    name: 'Label',
    projects: '000,000',
    rankChange: '000,000 ▲',
    logo: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
  },
  {
    id: 2,
    name: '토스뱅크',
    projects: '1,487',
    rankChange: '3 ▲',
    logo: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
  },
  {
    id: 3,
    name: '하버드대학교',
    projects: '982',
    rankChange: '1 ▲',
    logo: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
  },
  {
    id: 4,
    name: '티오더',
    projects: '884',
    rankChange: '1 ▲',
    logo: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
  },
  {
    id: 5,
    name: '선린인터넷고등학교',
    projects: '822',
    rankChange: '6 ▲',
    logo: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
  },
  {
    id: 6,
    name: '서울대학교',
    projects: '767',
    rankChange: '1 ▲',
    logo: 'https://t4.ftcdn.net/jpg/01/43/42/83/360_F_143428338_gcxw3Jcd0tJpkvvb53pfEztwtU9sxsgT.jpg'
  }
];

const AffiliationRanking = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '회사', '대학교', '고등학교'];

  return (
    <div className="pt-6 rounded-xl min-w-[302px]">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="text-xlarge font-bold">소속 랭킹</h2>
        <button className="text-small text-gray-500 hover:underline">전체 보기</button>
      </div>
      <div className="p-4 shadow-lg h-[396px] rounded-3xl bg-white-100">
        {/* Category Tabs */}
        <div className="flex space-x-4 border-b text-sm h-[30px] text-gray-500">
          {categories.map((category) => (
            <div
              key={category}
              className={`${
                selectedCategory === category
                  ? 'text-green-600 font-medium border-b-2 border-green-600'
                  : ''
              } px-2 text-small cursor-pointer`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>

        {/* Ranking List */}
        <ul className="space-y-4 mt-4">
          {mockData.map((affiliation, index) => (
            <li key={affiliation.id} className="flex items-center">
              <div className="text-gray-500 text-sm w-8 text-center">{index + 1}</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={affiliation.logo}
                  alt="Affiliation Logo"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="ml-4 flex-grow">
                <span className="text-sm font-medium">{affiliation.name}</span>
                <span className="text-xs text-gray-400 block">
                  {affiliation.projects} 개 프로젝트
                </span>
              </div>
              <div className="text-sm text-red-600">{affiliation.rankChange}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AffiliationRanking;
