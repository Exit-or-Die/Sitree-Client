import ProfileService from './ProfileService';
import { FocusedPointParams, ShortIntroParams } from './request';

const queryKeys = {
  searchProfile: (memberId: number) => ['searchProfile', memberId] as const,
  searchUserProjects: (memberId: number) => ['searchUserProjects', memberId] as const,
  updateShortIntroduction: (memberId: number) => ['updateShortIntroduction', memberId] as const
};

const ProfileQueryOptions = {
  searchProfile: (memberId: number) => ({
    queryKey: queryKeys.searchProfile(memberId),
    queryFn: () => ProfileService.searchProfile(memberId)
  }),
  searchUserProjects: (memberId: number) => ({
    queryKey: queryKeys.searchUserProjects(memberId),
    queryFn: () => ProfileService.searchUserProjects(memberId)
  }),
  updateFocusedPoints: (param: FocusedPointParams) => ({
    mutateFn: () => ProfileService.updateFocusedPoints(param)
  }),
  updateShortIntroduction: (memberId: number) => ({
    queryKey: queryKeys.updateShortIntroduction(memberId),
    queryFn: (param: ShortIntroParams) => ProfileService.updateShortIntroduction(memberId, param)
  })
};

export default ProfileQueryOptions;
