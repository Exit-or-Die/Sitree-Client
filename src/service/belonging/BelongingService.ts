import { Belonging } from 'types/common';

import Service from '../service';

interface BelongingData {
  belongingId: number;
  belongingType: Belonging;
  name: string;
  imageUrl: string;
}
class BelongingService extends Service {
  search(belonging: string) {
    const params = new URLSearchParams({ name: belonging }).toString();

    return this.http.get<BelongingData[]>(`belongings/search?${params}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new BelongingService();
