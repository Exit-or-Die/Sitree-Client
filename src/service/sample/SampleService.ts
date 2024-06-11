import Service from '../service';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

class SampleService extends Service {
  getPosts() {
    return this.http.get<Post[]>(`posts`);
  }
  getComments() {
    return this.http.get<Comment[]>(`comments`);
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new SampleService();
