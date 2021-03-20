import { ActionTree } from 'vuex';
import { State } from '@/types';
import axios from 'axios';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const actions: ActionTree<State, State> = {
	async initState(context) {
		const api = axios.create();
		const jwt = await Storage.get({ key: 'jwt' });
		await axios.all([
			api.get('https://liverary-api.herokuapp.com/words', {
				headers: {'Authorization': `Bearer ${ jwt.value }`}
			}),
			api.get('https://liverary-api.herokuapp.com/word_num_list', {
				headers: {'Authorization': `Bearer ${ jwt.value }`}
			})
		])
			.then(axios.spread((wordsResp, itemsResp) => {
				context.commit('setWords', wordsResp.data.words);
				context.commit('setLeafs', wordsResp.data.words);
				context.commit('setItems', itemsResp.data.word_num_list);
			}))
			.catch(err => console.log(err));
	},

	async getWords(context) {
		const jwt = await Storage.get({ key: 'jwt' });
		await axios.get('https://liverary-api.herokuapp.com/words', {
			headers: {'Authorization': `Bearer ${ jwt.value }`}
		})
			.then(resp => {
				context.commit('setWords', resp.data.words);
				context.commit('setLeafs', resp.data.words);
			})
			.catch(async err => {
				if (err.response.status === 401) {
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
						Storage.set({
							key: 'jwt',
							value: resp.data.access_token,
						});
						Storage.set({
							key: 'refresh_token',
							value: resp.data.refresh_token,
						});
					})
					.catch(err => console.log(err));
				}
			});
	},

	async getItems(context) {
		const jwt = await Storage.get({ key: 'jwt' });
		await axios.get('https://liverary-api.herokuapp.com/word_num_list', {
			headers: {'Authorization': `Bearer ${ jwt.value }`}
		})
			.then(resp => {
				context.commit('setItems', resp.data.word_num_list);
			})
			.catch(err => console.log(err));
	},

	async deleteWord (context, text: string) {
		const jwt = await Storage.get({ key: 'jwt' });
		await axios.post('https://liverary-api.herokuapp.com/delete', {
			headers: {'Authorization': `Bearer ${ jwt.value }`},
			word: text,
		})
			.then(() => {
				context.commit('deleteWord', text);
			})
			.catch(err => console.log(err));
	},

	async jwtTest (context) {
		const jwt = await Storage.get({ key: 'jwt' });
		await axios.get('https://liverary-api.herokuapp.com/debug/auth', {
			headers: {'Authorization': `Bearer ${ jwt.value }`}
		}).then(resp => {
			console.log(resp);
		})
	},

	async deleteJwt(context) {
		await Storage.set({
			key: 'jwt',
			value: 'hoge',
		});
	}
};
  
export default actions;