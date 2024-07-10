'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => (
  <div className="w-full h-screen flex flex-col justify-center items-center">
    <p className="text-2xl mb-2">Not Signed In</p>
    <button
      className="bg-blue-600 py-2 px-6 rounded-md mb-2"
      onClick={(e) => {
        console.log(e);
        signIn('google', {
          callbackUrl: '/'
        })
      }}
    >
      Sign in with google
    </button>
    <button
      className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
      onClick={() =>
        signIn('github', {
          callbackUrl: '/'
        })
      }
    >
      Sign in with github
    </button>
  </div>
);

export default LoginPage;
