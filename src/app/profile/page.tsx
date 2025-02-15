'use client';

import ProfileIntroSection from '@/components/profile/ProfileIntroSection';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProjectPortfolioSection from '@/components/profile/ProjectPortfolioSection';

const Profile = () => {
  return (
    <div className="w-full h-full flex px-48 py-6">
      <ProfileSidebar />

      <div className="flex-1 flex flex-col ml-6 space-y-8">
        <ProfileIntroSection />
        <ProjectPortfolioSection />
      </div>
    </div>
  );
};

export default Profile;
