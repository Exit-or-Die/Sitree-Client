import { signIn } from 'next-auth/react';
import React from 'react';

const Account = () => {
  return (
    <div className="text-black w-[300px] h-[200px]">
      <div className="mt-6 font-bold text-3xl flex flex-col items-center">
        <div>Login</div>
      </div>
      <div className="flex flex-col mt-10 mx-2.5">
        <button
          className="bg-blue-600 py-2 px-6 rounded-md mb-2"
          onClick={() => signIn('google', { callbackUrl: '/set-up' })}
        >
          Sign in with google
        </button>
        <button
          className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
          onClick={() =>
            signIn('github', {
              callbackUrl: '/set-up'
            })
          }
        >
          Sign in with github
        </button>
      </div>
    </div>
  );
};

export default Account;
