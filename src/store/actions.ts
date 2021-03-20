import { ActionTree } from 'vuex';
import { State } from '@/types';
import axios from 'axios';
import refreshJwt from '@/modules/refleshJwt';

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
			.catch(err => {
				if (err.response.status === 401) {
					refreshJwt();
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
			.catch(err => {
				if (err.response.status === 401) {
					refreshJwt();
				}
			});
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
			.catch(err => {
				if (err.response.status === 401) {
					refreshJwt();
				}
			});
	},

	async deleteJwt(context) {
		await Storage.set({
			key: 'jwt',
			value: 'hoge',
		});
	}
};
  
export default actions;