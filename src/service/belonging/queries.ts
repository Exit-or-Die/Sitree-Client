import BelongingService from './BelongingService';

const queryKeys = {
  search: () => ['search', 'belonging'] as const
};

const BelongingQueryOptions = {
  search: (belonging: string) => ({
    queryKey: queryKeys.search(),
    queryFn: () => BelongingService.search(belonging)
  })
};

export default BelongingQueryOptions;
