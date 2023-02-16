import { http } from './http';

export const signUpAPI = async data => {
  return await http.post('/users', data);
};

export const signInAPI = async data => {
  return await http.post('/users/signIn', data);
};

// 로그인한 유저 회원 정보 조회 이름이 너무 애매하긴 한데 ㅠ.
export const check = async () => {
  return await http.get('/users/check');
};
