import { isLoggedIn } from '@/service/auth/queries';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import ProfileUpdateForm from '@/components/profile/update/ProfileUpdateForm';

const ProfileUpdatePage = async () => {
  const isUser = await isLoggedIn(cookies);

  if (!isUser) {
    redirect('/404');
  }

  return (
    <div className="p-10">
      <ProfileUpdateForm />
    </div>
  );
};

export default ProfileUpdatePage;
