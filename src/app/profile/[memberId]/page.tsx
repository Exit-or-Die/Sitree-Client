import ProfileCareerSection from '@/components/profile/ProfileCareerSection';
import ProfileEducationSection from '@/components/profile/ProfileEducationSection';
import ProfileIntroSection from '@/components/profile/ProfileIntroSection';
import ProfileIntroSkeleton from '@/components/profile/ProfileIntroSkeleton';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import ProjectPortfolioSection from '@/components/profile/ProjectPortfolioSection';
import ProfileQueryOptions from '@/service/profile/queries';
import { getDehydratedQuery } from '@/hooks/react-query/react-query';
import { UserProfileResponse } from '@/service/profile/response';

interface ProfilePageProps {
  params: {
    memberId: string;
  };
}

const mockData = {
  "memberId": 1,
  "nickname": "Jona",
  "email": "test1@gmail.com",
  "profileImgUrl": "https://image.le.png",
  "thirdPartyProfileUrl": "https://github.com",
  "shortIntroduction": "i my me mine",
  "belongingId": 2,
  "belongingName": "가야대학교(김해)",
  "myPage": {
    "selfIntroduction": {
      "title": "성장을 즐기는 프론트엔드 개발자 이혜린입니다!",
      "contents": "성장을 즐기고 사용자에게 편리한 서비스를 만드는 목표를 가진\n주니어 Product Manager 김나연 입니다"
    },
    "careers": [{
        "careerName": "String123123",
        "startedAt": "2024-02-23T15:30:00",
        "endedAt": "2024-02-27T15:30:00",
        "position": "String",
        "department": "String",
        "projects": [
          {
            "projectName": "String",
            "startedAt": "2025-02-23T15:30:00",
            "endedAt": "2024-02-24T15:30:00",
            "contents": "project description",
            "roleTags": ["PM", "UX_UI", "FE", "BE", "AI", "DATA", "INFRA"]
          }
        ]
      }
    ],
    "educationActivities": [
      {
        "educationActivityName": "String",
        "startedAt": "2025-02-23T15:30:00",
        "endedAt": "2025-02-23T15:30:00",
        "majorOrOrganization": "String",
        "category": "UNIVERSITY",
        "contents": "String"
      }
    ],
    "techStacks": ["JAVA", "REACT", "VUE_JS", "NEXT_JS", "TYPESCRIPT"],
    "links": [
      {
        "linkProvider": "GITHUB",
        "link": "String123123"
      },
      {
        "linkProvider": "BEHANCE",
        "link": "bear04012"
      },
      {
        "linkProvider": "NOTION",
        "link": "bear04012"
      }
    ]
  }
}

const Profile = async ({ params }: ProfilePageProps) => {
  const { memberId } = params;

  const { queryKey: profileKey, queryFn: profileFn } =
    ProfileQueryOptions.searchProfile(memberId);

  const query = await getDehydratedQuery({ queryKey: profileKey, queryFn: profileFn }); 
  const profileDetail = query?.state.data as UserProfileResponse;

  return (
    <div className="w-full h-full flex px-48 py-6">
      <ProfileSidebar />

      <div className="flex-1 flex flex-col ml-6 space-y-8">
        <ProfileIntroSkeleton />
        <ProfileIntroSection 
          content={profileDetail.myPage.selfIntroduction}
          techStacks={profileDetail.myPage.techStacks}
          links={profileDetail.myPage.links}
        />
        <ProjectPortfolioSection />
        <ProfileCareerSection careers={profileDetail.myPage.careers} />
        <ProfileEducationSection></ProfileEducationSection>
      </div>
    </div>
  );
};

export default Profile;
