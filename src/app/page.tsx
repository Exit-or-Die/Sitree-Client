'use client';
import WithModal from '@/enhancers/WithModal';
import React, { useState } from 'react';

import SignInModal from '@/components/account/SignInModal';

export default function Home() {
  const SignWithModal = WithModal(SignInModal);
  const [toggleLogin, setToggleLogin] = useState(false);

  const onClickCloseModal = () => {
    setToggleLogin(false);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <SignWithModal isVisible={toggleLogin} onClickClose={onClickCloseModal} />
      <button
        className="bg-blue-600 py-2 px-6 rounded-md mb-2"
        onClick={() => setToggleLogin(true)}
      >
        Open Popup
      </button>
    </div>
  );
}
