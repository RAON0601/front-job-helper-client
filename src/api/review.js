import { http } from './http';

export const createReviewAPI = async data => {
  return await http.post('/reviews', data);
};

export const fetchReview = async reviewId => {
  return await http.get(`/reviews/${reviewId}`);
};

export const deleteReview = async reviewId => {
  return await http.delete(`/reviews/${reviewId}`);
};
