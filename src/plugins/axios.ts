import axios from 'axios';
import { getJwt, refreshJwt } from '@/modules/storage';

axios.interceptors.response.use(
  resp => resp,
  async err => {
    if (err.response.status === 401) {
      await refreshJwt();
      const config = err.config;
      const jwt = await getJwt();
      config.headers.Authorization = `Bearer ${ jwt }`
      return axios.request(config);
    } else {
      return Promise.reject(err);
    }
  }
);