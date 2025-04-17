import CategoryService from './CategoryService';

const queryKeys = {
  getCategories: () => ['category', 'all'] as const,
  getGroupedCategories: () => ['category', 'getGroupedCategories'] as const
};

const CategoryQueryOptions = {
  getCategories: () => ({
    queryKey: queryKeys.getCategories(),
    queryFn: () => CategoryService.getCategories()
  }),
  getGroupedCategories: () => ({
    queryKey: queryKeys.getGroupedCategories(),
    queryFn: () => CategoryService.getGroupedCategories()
  })
};

export default CategoryQueryOptions;
