import { CATEGORIES, FILTER_CATEGORIES } from '@/constants/home';
import CategoryQueryOptions from '@/service/category/queries';
import ProjectQueryOptions from '@/service/project/queries';
import { ProjectParamsRequest } from '@/service/project/request';
import RankingQueryOptions from '@/service/ranking/queries';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import React from 'react';

import ProjectGallery from '@/components/projectGallery/ProjectGallery';
import AffiliationRanking from '@/components/ranking/AffiliationRanking';
import SitreePick from '@/components/sitreePick/SitreePick';

const Home = async () => {
  const queryClient = new QueryClient();
  const projectCachedParams: ProjectParamsRequest = {
    sortType: FILTER_CATEGORIES[0].type,
    categoryIds: [],
    nameKeyword: ''
  };
  const categoryCachedParam = CATEGORIES[0].type;

  const { queryKey: categoryKey, queryFn: categoryFn } =
    CategoryQueryOptions.getGroupedCategories();
  await queryClient.prefetchQuery({ queryKey: categoryKey, queryFn: categoryFn });

  const { queryKey: sitreeKey, queryFn: sitreeFn } = ProjectQueryOptions.retrieveSitreePick();
  await queryClient.prefetchQuery({ queryKey: sitreeKey, queryFn: sitreeFn });

  const { queryKey: projectsKey, queryFn: projectsFn } =
    ProjectQueryOptions.retrieveProjects(projectCachedParams);
  await queryClient.prefetchQuery({ queryKey: projectsKey, queryFn: projectsFn });

  const { queryKey: rankingKey, queryFn: rankingFn } =
    RankingQueryOptions.retrieveAffiliationRanking(categoryCachedParam);
  await queryClient.prefetchQuery({ queryKey: rankingKey, queryFn: rankingFn });

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SitreePick />
        </HydrationBoundary>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AffiliationRanking />
        </HydrationBoundary>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectGallery />
      </HydrationBoundary>
    </div>
  );
};

export default Home;
