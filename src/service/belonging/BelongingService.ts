import Service from '../service';
import { BelongingSearchResult } from './response';

class BelongingService extends Service {
  search(belonging: string) {
    const params = new URLSearchParams({ name: belonging }).toString();

    return this.http.get<BelongingSearchResult>(`belongings/search?${params}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BelongingService();
