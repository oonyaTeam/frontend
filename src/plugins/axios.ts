import axios from 'axios';
import { getJwt, refreshJwt } from '@/modules/storage';

axios.interceptors.response.use(
  resp => resp,
  async err => {
    if (err.response.status === 401) {
      return refreshJwt().then(() => {
        const config = err.config;
        const jwt = getJwt;
        config.headers.Authorization = `Bearer ${ jwt }`
        return axios.request(config);
      })
    } else {
      return Promise.reject(err);
    }
  }
);