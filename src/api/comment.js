import { http } from './http';

export const createCommentAPI = async data => {
  return await http.post('/comments', data);
};

export const fetchCommentsAPI = async (reviewId, page) => {
  return await http.get(`/comments/${reviewId}?page=${page}`);
};

export const removeCommentAPI = async commentId => {
  return await http.delete(`/comments/${commentId}`);
};

export const updateCommentAPI = async comment => {
  return await http.put(`/comments/${comment.commentId}`, { contents: comment.contents });
};
