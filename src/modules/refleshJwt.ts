import axios from 'axios';
import setJwtAndRefreshToken from './setJwtAndRefreshToken';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const refleshJwt = async () => {
  const apikey = 'AIzaSyCHhAssGCGUBhG0OaTGRTW_jkZmB25eZvg';
	const refreshToken = (await Storage.get({ key: 'refresh_token' })).value || '';
	if(!refreshToken) return;
	const params = new URLSearchParams();
	params.append('grant_type', 'refresh_token');
	params.append('refresh_token', refreshToken);
	await axios.post(`https://securetoken.googleapis.com/v1/token?key=${apikey}`, params, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
	}).then(resp => {
		setJwtAndRefreshToken(resp.data.access_token, resp.data.refresh_token);
	})
	.catch(err => console.log(err));
};

export default refleshJwt;