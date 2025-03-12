import { getDehydratedQuery } from '@/hooks/react-query/react-query';
import ProfileQueryOptions from '@/service/profile/queries';
import { UserProfileResponse } from '@/service/profile/response';

import ProfileCareerSection from '@/components/profile/ProfileCareerSection';
import ProfileEducationSection from '@/components/profile/ProfileEducationSection';
import ProfileIntroSection from '@/components/profile/ProfileIntroSection';
import ProfileIntroSkeleton from '@/components/profile/ProfileIntroSkeleton';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProjectPortfolioSection from '@/components/profile/ProjectPortfolioSection';

interface ProfilePageProps {
  params: {
    memberId: string;
  };
}

const Profile = async ({ params }: ProfilePageProps) => {
  const { memberId } = params;

  const { queryKey: profileKey, queryFn: profileFn } = ProfileQueryOptions.searchProfile(memberId);

  const query = await getDehydratedQuery({ queryKey: profileKey, queryFn: profileFn });
  const profileDetail = query?.state.data as UserProfileResponse;

  return (
    <div className="w-full h-full flex px-48 py-6">
      <ProfileSidebar
        nickname={profileDetail.nickname}
        profileImgUrl={profileDetail.profileImgUrl}
        email={profileDetail.email}
        thirdPartyProfileUrl={profileDetail.thirdPartyProfileUrl}
        affiliation={profileDetail.belongingName}
      />

      <div className="flex-1 flex flex-col ml-6 space-y-8">
        {!profileDetail.myPage.selfIntroduction ? (
          <ProfileIntroSkeleton />
        ) : (
          <ProfileIntroSection
            content={profileDetail.myPage.selfIntroduction}
            techStacks={profileDetail.myPage.techStacks ?? []}
            links={profileDetail.myPage.links ?? []}
          />
        )}
        <ProjectPortfolioSection />
        {profileDetail.myPage.careers && (
          <ProfileCareerSection careers={profileDetail.myPage.careers} />
        )}
        {profileDetail.myPage.educationActivities && (
          <ProfileEducationSection education={profileDetail.myPage.educationActivities} />
        )}
      </div>
    </div>
  );
};

export default Profile;
