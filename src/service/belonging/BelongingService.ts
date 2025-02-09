import Service from '../service';
import { BelongingData } from './response';

class BelongingService extends Service {
  search(belonging: string) {
    const params = new URLSearchParams({ name: belonging }).toString();

    return this.http.get<BelongingData[]>(`belongings/search?${params}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BelongingService();
