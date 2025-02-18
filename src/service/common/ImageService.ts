import Service from '../service';

class ImageService extends Service {
  registerImage(file: FormData) {
    return this.http.post<string>('image', file, {
      includeAuth: true
    });
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ImageService();
