import RankingService from './RankingService';
import { ExtendedAffiliationType } from './request';

const queryKeys = {
  retrieveAffiliationRanking: (type: ExtendedAffiliationType) =>
    ['retrieveAffiliationRanking', type] as const
};

const RankingQueryOptions = {
  retrieveAffiliationRanking: (type: ExtendedAffiliationType) => ({
    queryKey: queryKeys.retrieveAffiliationRanking(type),
    queryFn: () => RankingService.retrieveAffiliationRanking(type)
  })
};

export default RankingQueryOptions;
