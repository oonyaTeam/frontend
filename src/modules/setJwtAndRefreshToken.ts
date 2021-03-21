import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const setJwtAndRefreshToken = (jwt: string, refreshToken: string) => {
  Storage.set({
    key: 'jwt',
    value: jwt,
  });
  Storage.set({
    key: 'refresh_token',
    value: refreshToken,
  });
};

export default setJwtAndRefreshToken;