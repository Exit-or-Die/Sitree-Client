import Service from '../service';

interface CategoryData {
  categoryId: number;
  categoryName: string;
}

export interface CategoriesData {
  categoryIds: Array<number>;
  categoryNames: string;
}

class CategoryService extends Service {
  getGroupedCategories() {
    return this.http.get<Array<Array<CategoryData>>>('categories/grouped');
  }
}
  
// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
  