import Service from '../service';
import { CategoryData } from './response';
class CategoryService extends Service {
  getCategories() {
    return this.http.get<Array<CategoryData>>('categories/all');
  }
  getGroupedCategories() {
    return this.http.get<Array<Array<CategoryData>>>('categories/grouped');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
