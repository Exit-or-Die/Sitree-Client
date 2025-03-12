import ProfileService from './ProfileService';

const queryKeys = {
  searchProfile: (memberId: string) => ['searchProfile', memberId] as const
};

const ProfileQueryOptions = {
  searchProfile: (memberId: string) => ({
    queryKey: queryKeys.searchProfile(memberId),
    queryFn: () => ProfileService.searchProfile(memberId)
  })
};

export default ProfileQueryOptions;
