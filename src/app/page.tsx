import React from 'react';

import ProjectGallery from '@/components/projectGallery/ProjectGallery';
import AffiliationRanking from '@/components/ranking/AffiliationRanking';
import SitreePick from '@/components/sitreePick/SitreePick';

import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CategoryQueryOptions from '@/service/category/queries';

const Home = async () => {
  const { queryKey, queryFn } = CategoryQueryOptions.getGroupedCategories();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey,
    queryFn
  })
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex">
        <SitreePick />
        <AffiliationRanking />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectGallery />
      </HydrationBoundary>
    </div>
  );
};

export default Home;
