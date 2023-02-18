import axios from 'axios';

export const fetchJobs = async () => {
  return await axios.get('https://front-job-helper.s3.ap-northeast-2.amazonaws.com/info.json');
};
