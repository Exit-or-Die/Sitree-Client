import { Nullable } from 'types/common';

import Service from '../service';

export interface Affiliation {
  belongingId: number;
  type: 'UNIVERSITY' | 'HIGH_SCHOOL' | 'CORPORATION';
  name: string;
  imageUrl: Nullable<string>;
  currentRanking: number;
  prevRanking: number;
}
class RankingService extends Service {
  retrieveAffiliationRanking() {
    return this.http.get<Array<Affiliation>>('belongings/ranking');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RankingService();
