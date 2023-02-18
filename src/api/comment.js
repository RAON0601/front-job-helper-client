import { http } from './http';

export const createCommentAPI = async data => {
  return await http.post('/comments', data);
};
