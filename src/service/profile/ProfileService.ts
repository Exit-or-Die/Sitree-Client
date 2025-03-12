import Service from '@/service/service';
import { UserProfileResponse } from './response';

class ProfileService extends Service {
  searchProfile(memberId: string) {
    return this.http.get<UserProfileResponse>(`members/${memberId}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProfileService();
