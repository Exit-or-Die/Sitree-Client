import Service from '@/service/service';

import { UserProfileResponse, UserProject } from './response';

class ProfileService extends Service {
  searchProfile(memberId: string) {
    return this.http.get<UserProfileResponse>(`members/${memberId}`);
  }

  searchUserProjects(memberId: string) {
    return this.http.get<Array<UserProject>>(`projects/participants/${memberId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileService();
