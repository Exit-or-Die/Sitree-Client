'use client';

import { CATEGORIES } from '@/constants/home';
import RankingQueryOptions from '@/service/ranking/queries';
import { CategoryType } from '@/service/ranking/request';
import { AffiliationResponseData } from '@/service/ranking/response';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import SImage from '../common/Image';

const AffiliationRanking = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const { queryKey, queryFn } = RankingQueryOptions.retrieveAffiliationRanking(
    selectedCategory.type
  );
  const { data } = useQuery<AffiliationResponseData>({
    queryKey,
    queryFn
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    const otherCategories = CATEGORIES.slice(1);
    otherCategories.forEach((category: CategoryType) => {
      const { queryKey, queryFn } = RankingQueryOptions.retrieveAffiliationRanking(category.type);

      queryClient.prefetchQuery({ queryKey, queryFn });
    });
  }, [queryClient]);

  return (
    <div className="pt-6 rounded-xl min-w-[302px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xlarge font-bold">소속 랭킹</h2>
        <button className="text-small text-slate-30 hover:underline">전체 보기</button>
      </div>
      <div className="p-4 shadow-lg h-[396px] rounded-3xl bg-white-100">
        <div className="pt-1 flex border-b text-sm h-[30px] text-slate-50">
          {CATEGORIES.map((category) => (
            <div
              key={category.label}
              className={`${
                selectedCategory.type === category.type
                  ? 'text-green-600 font-medium border-b-2 border-green-600'
                  : ''
              } px-2 text-small cursor-pointer`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.label}
            </div>
          ))}
        </div>

        <ul className="space-y-4 mt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 h-[320px]">
          {data?.content.map((affiliation, index) => {
            const rankChange = affiliation.prevRanking - affiliation.currentRanking;
            const rankChangeColor =
              rankChange > 0 ? '#F6424E' : rankChange < 0 ? '#1271FF' : 'gray';

            return (
              <li key={affiliation.belongingId} className="flex items-center">
                <div className="text-slate-10 text-xsmall w-8 pl-2">{index + 1}</div>
                <div className="rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <SImage
                    src={
                      affiliation.imageUrl ??
                      'https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/25-famous-app-logos-to-keep-you-amused/TIDAL.jpg'
                    }
                    alt="Affiliation Logo"
                    width={38}
                    height={38}
                    defaultType="affiliation"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <span className="text-base font-bd">{affiliation.name}</span>
                  <div className="text-xsmall text-slate-60 block">
                    <span className="text-slate-30 font-md">{affiliation.projectCount} </span>개
                    프로젝트
                  </div>
                </div>
                <div className="text-sm" style={{ color: rankChangeColor }}>
                  {rankChange !== 0 ? (
                    <div className="flex justify-center items-center">
                      <span className="mr-1 text-[10px]">{Math.abs(rankChange)}</span>
                      <SImage
                        src={`/${rankChange > 0 ? 'up' : 'down'}.svg`}
                        alt={`caret ${rankChange > 0 ? 'up' : 'down'}`}
                        width={8}
                        height={6}
                      />
                    </div>
                  ) : (
                    <SImage src="/trendIndicator.svg" width={16} height={16} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AffiliationRanking;
