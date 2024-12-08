import ImageService from '@/service/common/ImageService';

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await ImageService.registerImage(formData);

    return res;
  } catch (error) {
    console.error('API ERROR: Uploading File:', error);
    throw error;
  }
};
