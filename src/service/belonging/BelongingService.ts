import Service from '../service';

class BelongingService extends Service {
    search(belonging: string) {
      return this.http.get<any>(`/belongings/serach?name=${belonging}`);
    }
  }
  
  // eslint-disable-next-line import/no-anonymous-default-export
  export default new BelongingService();
  