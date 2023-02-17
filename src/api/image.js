import { http } from './http';

export const uploadImageAPI = async data => {
  return await http.post('/images/upload', data);
};
