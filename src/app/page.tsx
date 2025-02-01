import React from 'react';

import ProjectGallery from '@/components/projectGallery/ProjectGallery';
import AffiliationRanking from '@/components/ranking/AffiliationRanking';
import SitreePick from '@/components/sitreePick/SitreePick';

import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import CategoryQueryOptions from '@/service/category/queries';
import ProjectQueryOptions from '@/service/project/queries';

const Home = async () => {
  const queryClient = new QueryClient();

  const { queryKey: categoryKey, queryFn: categoryFn } = CategoryQueryOptions.getGroupedCategories();
  await queryClient.prefetchQuery({ queryKey: categoryKey, queryFn: categoryFn });

  const { queryKey: sitreeKey, queryFn: sitreeFn } = ProjectQueryOptions.retrieveSitreePick();
  await queryClient.prefetchQuery({ queryKey: sitreeKey, queryFn: sitreeFn });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SitreePick />
        </HydrationBoundary>
        <AffiliationRanking />
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectGallery />
      </HydrationBoundary>
    </div>
  );
};

export default Home;
