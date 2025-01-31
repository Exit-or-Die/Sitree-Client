'use client';

import React from 'react';

import ProjectGallery from '@/components/projectGallery/ProjectGallery';
import AffiliationRanking from '@/components/ranking/AffiliationRanking';
import SitreePick from '@/components/sitreePick/SitreePick';

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="flex">
        <SitreePick />
        <AffiliationRanking />
      </div>

      <ProjectGallery />
    </div>
  );
};

export default Home;
