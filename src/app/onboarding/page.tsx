'use client';

import AuthService from '@/service/auth/AuthService';
import { setCookie } from '@/utils/cookie';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState, useMemo, useEffect, useCallback } from 'react';

const Onboarding = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  console.log(session);

  const handleRedirect = useCallback(() => {
    if (!session) return;

    if (session.detail.accessToken) {
      setCookie('accessToken', session.detail.accessToken);
      redirect('/');
    }
  }, [session]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  const image = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }

    return session?.user?.image;
  }, [session, imageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    const { detail } = session;
    try {
      const response = await AuthService.signUp({
        authId: detail.authId,
        email: detail.email,
        nickname: username || detail.nickname,
        profileImgUrl: imageFile ? URL.createObjectURL(imageFile) : detail.profileImgUrl
      });

      if (response.code === 200) {
        // TBD: after onboarding markup is decided
        document.cookie = `accessToken=${response.value.accessToken}; path=/; secure; SameSite=Lax`;
        redirect('/');
      } else {
        console.error('Error signing up:', response.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  // TBD: after loading component is implemented
  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {/* <div className="w-[580px] h-[736px] bg-[#FFF] border-1 "></div> */}
      <h1>Setup your profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder={session?.detail.nickname}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Profile Image URL:</label>
          <input type="file" onChange={handleChange} />
          {image && <Image src={image} width={500} height={500} alt="Profile Image" />}
        </div>
        <button className="bg-blue-600 py-2 px-6 rounded-md mb-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
