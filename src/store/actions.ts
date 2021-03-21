import { ActionTree } from 'vuex';
import { State } from '@/types';
import axios from 'axios';
import { getJwt } from '@/modules/storage';

const actions: ActionTree<State, State> = {
	async initState(context) {
		await context.dispatch('getItems');
		await context.dispatch('getWords');
	},

	async getWords(context) {
		const jwt = await getJwt();
		await axios.get('https://liverary-api.herokuapp.com/words', {
			headers: {'Authorization': `Bearer ${ jwt }`}
		})
			.then(resp => {
				context.commit('setWords', resp.data.words);
				context.commit('setLeafs', resp.data.words);
			})
			.catch(err => console.log(err));
	},

	async getItems(context) {
		const jwt = await getJwt();
		await axios.get('https://liverary-api.herokuapp.com/word_num_list', {
			headers: {'Authorization': `Bearer ${ jwt }`}
		})
			.then(resp => {
				context.commit('setItems', resp.data.word_num_list);
			})
			.catch(err => console.log(err));
	},

	async getRanking(context) {
		const jwt = await getJwt();
		await axios.get('https://liverary-api.herokuapp.com/ranking', {
			headers: {'Authorization': `Bearer ${ jwt }`}
		})
			.then(resp => {
				context.commit('setRanking',resp.data.ranking);
			})
			.catch(err => console.log(err));
	},

	async deleteWord (context, text: string) {
		const jwt = await getJwt();
		await axios.post('https://liverary-api.herokuapp.com/delete', {
			headers: {'Authorization': `Bearer ${ jwt }`},
			word: text,
		})
			.then(() => {
				context.commit('deleteWord', text);
			})
			.catch(err => console.log(err));
	},

	setDate (context, date: string) {
		context.commit('setDate', date);
	},
};
  
export default actions;
