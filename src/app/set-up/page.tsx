'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

export default function Setup() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    const { detail } = session;
    if (detail.accessToken) {
      document.cookie = `accessToken=${detail.accessToken}; path=/; secure; SameSite=Lax`;
      router.push('/');
    }
  }, [session]);

  const image = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }

    return session?.user?.image;
  }, [session, imageFile]);

  if (status === 'loading') return <p>Loading...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //   const response = await axios.post('/member/sign-up', {
      //     email: session.user.email,
      //     username,
      //     image
      //   });
      router.push('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Setup your profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder={session?.user?.name}
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
}
