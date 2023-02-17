import { http } from './http';

export const createReviewAPI = async data => {
  return await http.post('/reviews', data);
};

export const fetchReviewAPI = async reviewId => {
  return await http.get(`/reviews/${reviewId}`);
};

export const deleteReviewAPI = async reviewId => {
  return await http.delete(`/reviews/${reviewId}`);
};

export const updateReviewAPI = async (reviewId, data) => {
  return await http.put(`/reviews/${reviewId}`, data);
};

export const countReviewAPI = async () => {
  return await http.get('/reviews/count');
};

export const fetchReviewsAPI = async page => {
  return await http.get(`/reviews?page=${page}`);
};
