import { http } from './http';

export const signUpAPI = async data => {
  return await http.post('/users', data);
};
