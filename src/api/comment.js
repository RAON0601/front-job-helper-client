import { http } from './http';

export const createCommentAPI = async data => {
  return await http.post('/comments', data);
};

export const fetchCommentsAPI = async (reviewId, page) => {
  return await http.get(`/comments/${reviewId}?page=${page}`);
};
