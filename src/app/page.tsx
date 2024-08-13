'use client';
import WithModal from '@/enhancers/WithModal';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

import Account from '@/components/account/Account';
import AuthService from '@/service/auth/AuthService';

export default function Home() {
  const { data: session } = useSession();
  const AccountWithModal = WithModal(Account);
  const [toggleLogin, setToggleLogin] = useState(false);
  // console.log(session);

  const onClickCloseModal = () => {
    setToggleLogin(false);
  };

  const signInRequest = async () => {
    const request = {
      "provider": "GOOGLE", 
      "email": "bear04012@gmail.com",
      "oAuthToken": "ya29.a0AcM612yOpc-DG1zzH5Gvjz-uxc4vDfJFwSBoH1sUDenCcq-VftWa5bXWJP0FTomvRXeW1JYAW3idlXpABLQfKxH9b3WbbWtmoazlA7XRFVNspa4NUPODNAYO9JEnBB7by7kS69bq5N2DCmrbAsTOcDnmBR9umtUUSJwaCgYKAWsSARMSFQHGX2MiqCFnBa8mqfovW8jgQ9WvpQ0170"
    }
    await AuthService.signIn(request);
    
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <AccountWithModal isVisible={toggleLogin} onClickClose={onClickCloseModal} />
      <button
        className="bg-blue-600 py-2 px-6 rounded-md mb-2"
        onClick={() => setToggleLogin(true)}
      >
        Open Popup
      </button>

      <button
        className="bg-blue-600 py-2 px-6 rounded-md mb-2"
        onClick={signInRequest}
      >
        click signin
      </button>
    </div>
  );
}
