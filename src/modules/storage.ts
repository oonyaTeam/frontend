import axios from 'axios';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const APIKEY = 'AIzaSyCHhAssGCGUBhG0OaTGRTW_jkZmB25eZvg';

const getJwt = async () => {
  return (await Storage.get({ key: 'jwt' })).value;
}

const setJwt = async (idToken: string) => {
  await Storage.set({
    key: 'jwt',
    value: idToken,
  });
}

const getRefreshToken = async () => {
  return (await Storage.get({ key: 'refresh_token' })).value;
}

const setRefreshToken = async (refreshToken: string) => {
	Storage.set({
    key: 'refresh_token',
    value: refreshToken,
  });
}

const setJwtAndRefreshToken = (jwt: string, refreshToken: string) => {
  setJwt(jwt);
  setRefreshToken(refreshToken);
};

const refreshJwt = async () => {
	const refreshToken = await getRefreshToken();
	if(!refreshToken) return;
	const params = new URLSearchParams();
	params.append('grant_type', 'refresh_token');
	params.append('refresh_token', refreshToken);
	await axios.post(`https://securetoken.googleapis.com/v1/token?key=${APIKEY}`, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
	}).then(resp => {
		setJwtAndRefreshToken(resp.data.access_token, resp.data.refresh_token);
	})
	.catch(err => console.log(err));
};

const clearStorage = () => Storage.clear();

export { getJwt, setJwt, setJwtAndRefreshToken, refreshJwt, clearStorage };

