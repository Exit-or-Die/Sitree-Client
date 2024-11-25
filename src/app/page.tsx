'use client';
import WithModal from '@/enhancers/WithModal';
import React, { useState } from 'react';

import SignInModal from '@/components/account/SignInModal';
import SitreePick from '@/components/sitreePick/SitreePick';
import AffiliationRanking from '@/components/ranking/AffiliationRanking';

export default function Home() {
  const SignWithModal = WithModal(SignInModal);
  const [toggleLogin, setToggleLogin] = useState(false);

  const onClickCloseModal = () => {
    setToggleLogin(false);
  };

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
        yo
        <div className="home-page__categories"></div>
        <div className="home-page__projects"></div>
      </div>
    </div>
  );
}
