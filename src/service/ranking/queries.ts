import RankingService from './RankingService';

const queryKeys = {
  retrieveAffiliationRanking: () => ['ranking', 'retrieveAffiliationRanking'] as const
};

const RankingQueryOptions = {
  retrieveAffiliationRanking: () => ({
    queryKey: queryKeys.retrieveAffiliationRanking(),
    queryFn: () => RankingService.retrieveAffiliationRanking()
  })
};

export default RankingQueryOptions;
