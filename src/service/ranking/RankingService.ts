import Service from '../service';
import { ExtendedAffiliationType } from './request';
import { AffiliationResponseData } from './response';

class RankingService extends Service {
  retrieveAffiliationRanking(type: ExtendedAffiliationType) {
    const params = new URLSearchParams({ type }).toString();

    return this.http.get<AffiliationResponseData>(`belongings/ranking?${params}`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new RankingService();
