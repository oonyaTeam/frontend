import Vuex from 'vuex';
import axios from 'axios';
import { State, Item, Word } from '../types'


export const store = new Vuex.Store<State>({
  state: {
    items: [],
    words: [],
  },
  getters: {
    items: ({ items }) => items,

    allWords: ({ words }) => words,

    monthlyWords: ({ words }) => (month: string) => {
      return words.filter(word => word.date.startsWith(month));
    },
    itemsCount: (state, getters) =>{
      return getters.items.length;
    }
  },
  mutations: {
    setWords(state, words: Word[]) {
      state.words = words;
    },

    setItems(state, items: Item[]) {
      state.items = items;
    }
  },
  actions: {
    async initState(context) {
      const api = axios.create();
      await axios.all([
        api.get('https://liverary-api.herokuapp.com/words'),
        api.get('https://liverary-api.herokuapp.com/word_num_list')
      ])
        .then(axios.spread((wordsResp, itemsResp) => {
          context.commit('setWords', wordsResp.data.words);
          context.commit('setItems', itemsResp.data.word_num_list);
        }))
        .catch(err => console.log(err));
    },

    async getWords(context) {
      await axios.get('https://liverary-api.herokuapp.com/words')
        .then(resp => {
          context.commit('setWords', resp.data.words)
        })
        .catch(err => console.log(err));
    },

    async getItems(context) {
      await axios.get('https://liverary-api.herokuapp.com/word_num_list')
        .then(resp => {
          context.commit('setItems', resp.data.word_num_list);
        })
        .catch(err => console.log(err));
    },

    async deleteWord (context, word: string) {
      await axios.post('https://liverary-api.herokuapp.com/delete', { word: word })
        .then(() => {console.log('delete')})
        .catch(err => console.log(err));
    }
  }
});
