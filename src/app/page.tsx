'use client';

import React from 'react';

import AffiliationRanking from '@/components/ranking/AffiliationRanking';
import SitreePick from '@/components/sitreePick/SitreePick';

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="flex">
        <div className="flex-1">
          <SitreePick />
        </div>
        <div>
          <AffiliationRanking />
        </div>
      </div>

      <div className="home-page__bottom-section">
        <div className="home-page__categories"></div>
        <div className="home-page__projects"></div>
      </div>
    </div>
  );
};

export default Home;
