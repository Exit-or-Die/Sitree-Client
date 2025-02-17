import BelongingService from './BelongingService';

const queryKeys = {
  search: (belonging: string) => ['search', belonging] as const
};

const BelongingQueryOptions = {
  search: (belonging: string) => ({
    queryKey: queryKeys.search(belonging),
    queryFn: () => BelongingService.search(belonging)
  })
};

export default BelongingQueryOptions;
