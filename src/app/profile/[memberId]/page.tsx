import { getDehydratedQueries } from '@/hooks/react-query/react-query';
import ProfileQueryOptions from '@/service/profile/queries';
import { UserProfileResponse, UserProject } from '@/service/profile/response';
import { isEmpty } from '@/utils/array';

import ProfileCareerSection from '@/components/profile/ProfileCareerSection';
import ProfileEducationSection from '@/components/profile/ProfileEducationSection';
import ProfileIntroSection from '@/components/profile/ProfileIntroSection';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProjectPortfolioSection from '@/components/profile/ProjectPortfolioSection';
import ProjectSectionSkeleton from '@/components/profile/ProjectSectionSkeleton';

interface ProfilePageProps {
  params: {
    memberId: string;
  };
}

const Profile = async ({ params }: ProfilePageProps) => {
  const { memberId } = params;

  const queries = [
    ProfileQueryOptions.searchProfile(memberId),
    ProfileQueryOptions.searchUserProjects(memberId)
  ];

  const [userProfileQuery, userProjectsQuery] = await getDehydratedQueries(queries);
  const profileDetail = userProfileQuery?.state.data as UserProfileResponse;
  const { title, contents } = profileDetail.myPage.selfIntroduction;
  const { techStacks, links } = profileDetail.myPage;
  const showUserSkeleton = !title && !contents && isEmpty(techStacks) && isEmpty(links);
  const projects = userProjectsQuery?.state.data as Array<UserProject>;

  return (
    <div className="w-full h-full flex px-48 py-6">
      <ProfileSidebar
        nickname={profileDetail.nickname}
        profileImgUrl={profileDetail.profileImgUrl}
        email={profileDetail.email}
        thirdPartyProfileUrl={profileDetail.thirdPartyProfileUrl}
        affiliation={profileDetail.belongingName}
        phoneNumber={profileDetail.phoneNumber}
        position={profileDetail.position}
        shortIntroduction={profileDetail.shortIntroduction}
      />

      <div className="flex-1 flex flex-col ml-6 space-y-8">
        {showUserSkeleton ? (
          <ProjectSectionSkeleton type="profile" />
        ) : (
          <ProfileIntroSection
            content={profileDetail.myPage.selfIntroduction}
            techStacks={techStacks}
            links={links}
          />
        )}
        {isEmpty(projects) ? (
          <ProjectSectionSkeleton type="project" />
        ) : (
          <ProjectPortfolioSection projects={projects} memberId={memberId} />
        )}

        {!isEmpty(profileDetail.myPage.careers.careerList) && (
          <ProfileCareerSection careers={profileDetail.myPage.careers} />
        )}
        {!isEmpty(profileDetail.myPage.educationActivities) && (
          <ProfileEducationSection education={profileDetail.myPage.educationActivities} />
        )}
      </div>
    </div>
  );
};

export default Profile;
