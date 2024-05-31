'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.firstTime) {
      router.push('/set-up');
    }
  }, [session]);

  if (session) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
          <Image src={session.user?.image as string} fill alt="" />
        </div>
        <p className="text-2xl mb-2">
          Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As
        </p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <button className="bg-red-600 py-2 px-6 rounded-md" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-2xl mb-2">Not Signed In</p>
      <button
        className="bg-blue-600 py-2 px-6 rounded-md mb-2"
        onClick={() =>
          signIn('google', {
            callbackUrl: '/'
          })
        }
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
}
