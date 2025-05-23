import Service from '@/service/service';

import { FocusedPointParams, ProfileUpdateRequest, ShortIntroParams } from './request';
import { FocusPoints, ShortIntroResponse, UserProfileResponse, UserProject } from './response';

class ProfileService extends Service {
  searchProfile(memberId: number) {
    return this.http.get<UserProfileResponse>(`members/${memberId}`);
  }

  searchUserProjects(memberId: number) {
    return this.http.get<Array<UserProject>>(`projects/participants/${memberId}`);
  }

  updateFocusedPoints(query: FocusedPointParams) {
    return this.http.post<FocusPoints>('focused-points', query, {
      includeAuth: true
    });
  }

  updateShortIntroduction(memberId: number, query: ShortIntroParams) {
    return this.http.put<ShortIntroResponse>(`members/${memberId}/short-introduction`, query, {
      includeAuth: true
    });
  }

  updateProfile(memberId: number, query: ProfileUpdateRequest) {
    return this.http.put<ShortIntroResponse>(`members/${memberId}`, query);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileService();
