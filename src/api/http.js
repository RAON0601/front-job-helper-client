import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://ec2-13-209-16-98.ap-northeast-2.compute.amazonaws.com:5000/api',
  withCredentials: true,
});
