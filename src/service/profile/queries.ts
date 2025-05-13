import ProfileService from './ProfileService';
import { FocusedPointParams, ShortIntroParams } from './request';

const queryKeys = {
  searchProfile: (memberId: string) => ['searchProfile', memberId] as const,
  searchUserProjects: (memberId: string) => ['searchUserProjects', memberId] as const,
  updateShortIntroduction: (memberId: string) => ['updateShortIntroduction', memberId] as const
};

const ProfileQueryOptions = {
  searchProfile: (memberId: string) => ({
    queryKey: queryKeys.searchProfile(memberId),
    queryFn: () => ProfileService.searchProfile(memberId)
  }),
  searchUserProjects: (memberId: string) => ({
    queryKey: queryKeys.searchUserProjects(memberId),
    queryFn: () => ProfileService.searchUserProjects(memberId)
  }),
  updateFocusedPoints: (param: FocusedPointParams) => ({
    mutateFn: () => ProfileService.updateFocusedPoints(param)
  }),
  updateShortIntroduction: (memberId: string) => ({
    queryKey: queryKeys.updateShortIntroduction(memberId),
    queryFn: (param: ShortIntroParams) => ProfileService.updateShortIntroduction(memberId, param)
  })
};

export default ProfileQueryOptions;
