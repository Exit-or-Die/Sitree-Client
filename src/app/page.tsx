import { CATEGORIES, FILTER_CATEGORIES } from '@/constants/home';
import { getDehydratedQueries } from '@/hooks/react-query/react-query';
import CategoryQueryOptions from '@/service/category/queries';
import ProjectQueryOptions from '@/service/project/queries';
import { ProjectParamsRequest } from '@/service/project/request';
import RankingQueryOptions from '@/service/ranking/queries';
import { HydrationBoundary } from '@tanstack/react-query';
import React from 'react';

import ProjectGallery from '@/components/projectGallery/ProjectGallery';
import AffiliationRanking from '@/components/ranking/AffiliationRanking';
import SitreePick from '@/components/sitreePick/SitreePick';

const Home = async () => {
  const projectCachedParams: ProjectParamsRequest = {
    sortType: FILTER_CATEGORIES[0].type,
    categoryIds: [],
    nameKeyword: ''
  };
  const categoryCachedParam = CATEGORIES[0].type;

  const queries = [
    CategoryQueryOptions.getGroupedCategories(),
    ProjectQueryOptions.retrieveSitreePick(),
    ProjectQueryOptions.retrieveProjects(projectCachedParams),
    RankingQueryOptions.retrieveAffiliationRanking(categoryCachedParam)
  ];
  const dehydratedState = await getDehydratedQueries(queries);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <HydrationBoundary state={{ queries: dehydratedState }}>
        <div className="flex">
          <SitreePick />
          <AffiliationRanking />
        </div>
        <ProjectGallery />
      </HydrationBoundary>
    </div>
  );
};

export default Home;
