import Service from '../service';
import { CategoryData } from './response';
class CategoryService extends Service {
  getGroupedCategories() {
    return this.http.get<Array<Array<CategoryData>>>('categories/grouped');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService();
