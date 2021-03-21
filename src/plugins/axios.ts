import axios from 'axios';
import refreshJwt from '@/modules/refleshJwt';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

axios.interceptors.response.use(
  resp => resp,
  async err => {
    if (err.response.status === 401) {
      return refreshJwt().then(async () => {
        const config = err.config;
        const jwt = await Storage.get({ key: 'jwt' });
        config.headers.Authorization = `Bearer ${ jwt.value }`
        return axios.request(config);
      })
    } else {
      return Promise.reject(err);
    }
  }
);