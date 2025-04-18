import Service from '@/service/service';

import { FocusedPointParams } from './request';
import { FocusPoints, UserProfileResponse, UserProject } from './response';

class ProfileService extends Service {
  searchProfile(memberId: string) {
    return this.http.get<UserProfileResponse>(`members/${memberId}`);
  }

  searchUserProjects(memberId: string) {
    return this.http.get<Array<UserProject>>(`projects/participants/${memberId}`);
  }

  updateFocusedPoints(query: FocusedPointParams) {
    return this.http.post<FocusPoints>('focused-points', query, {
      includeAuth: true
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileService();
