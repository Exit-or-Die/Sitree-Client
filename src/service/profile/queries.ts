import ProfileService from './ProfileService';

const queryKeys = {
  searchProfile: (memberId: string) => ['searchProfile', memberId] as const,
  searchUserProjects: (memberId: string) => ['searchUserProjects', memberId] as const
};

const ProfileQueryOptions = {
  searchProfile: (memberId: string) => ({
    queryKey: queryKeys.searchProfile(memberId),
    queryFn: () => ProfileService.searchProfile(memberId)
  }),
  searchUserProjects: (memberId: string) => ({
    queryKey: queryKeys.searchUserProjects(memberId),
    queryFn: () => ProfileService.searchUserProjects(memberId)
  })
};

export default ProfileQueryOptions;
