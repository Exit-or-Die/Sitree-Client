'use client'

import { Affiliation } from '@/service/ranking/RankingService';
import RankingQueryOptions from '@/service/ranking/queries';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const AffiliationRanking = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '회사', '대학교', '고등학교'];

  const { queryKey, queryFn } = RankingQueryOptions.retrieveAffiliationRanking();
  const { data = [] } = useQuery<Array<Affiliation>>({ queryKey, queryFn });
  const [rankingList, setRankingList] = useState([]);
  
  useEffect(() => {
    setRankingList(data.slice(0,6));
  }, [data]);
  console.log(rankingList);

  return (
    <div className="pt-6 rounded-xl min-w-[302px]">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="text-xlarge font-bold">소속 랭킹</h2>
        <button className="text-small text-slate-30 hover:underline">전체 보기</button>
      </div>
      <div className="p-4 shadow-lg h-[396px] rounded-3xl bg-white-100">
        <div className="flex border-b text-sm h-[30px] text-slate-50">
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

        <ul className="space-y-4 mt-4">
          {rankingList.map((affiliation, index) => (
            <li key={affiliation.belongingId} className="flex items-center">
              <div className="text-slate-10 text-xsmall w-8 pl-2">{index + 1}</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <Image
                  src={affiliation.imageUrl ?? 'https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/25-famous-app-logos-to-keep-you-amused/TIDAL.jpg'}
                  alt="Affiliation Logo"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="ml-4 flex-grow">
                <span className="text-base font-bd">{affiliation.name}</span>
                <div className="text-xsmall text-slate-60 block">
                  <span className='text-slate-30 font-md'>8 </span>
                  개 프로젝트
                </div>
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
