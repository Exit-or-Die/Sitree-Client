import CategoryService from './CategoryService';

const queryKeys = {
  getGroupedCategories: () => ['category', 'getGroupedCategories'] as const,
};

const CategoryQueryOptions = {
  getGroupedCategories: () => ({
    queryKey: queryKeys.getGroupedCategories(),
    queryFn: () => CategoryService.getGroupedCategories()
  }),
};

export default CategoryQueryOptions;