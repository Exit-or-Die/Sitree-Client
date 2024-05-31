'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Setup() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const router = useRouter();
  console.log(session);

  if (status === 'loading') return <p>Loading...</p>;

  //   if (!session) {
  //     signIn();

  //     return null;
  //   }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //   await axios.post('/api/auth/update-profile', {
      //     email: session.user.email,
      //     username,
      //     image
      //   });
      router.push('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Profile Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
