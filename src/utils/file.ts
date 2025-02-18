import ImageService from '@/service/common/ImageService';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  if (!(file instanceof File)) {
    throw new Error('Invalid file provided');
  }
  try {
    const res = await ImageService.registerImage(formData);
    console.log('서버 응답:', res); // 응답 결과를 로그로 출력

    return res;
  } catch (error) {
    console.error('API ERROR: Uploading File:', error);
    throw error;
  }
};
