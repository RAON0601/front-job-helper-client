import { http } from './http';

export const createReviewAPI = async data => {
  return await http.post('/reviews', data);
};
