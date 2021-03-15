import Vuex from 'vuex';
import axios from 'axios';

interface Item {
  month: string;
  sum: number;
}

interface Word {
  date: string;
  text: string;
}

export interface State {
  items: Array<Item>;
  words: Array<Word>;
}

export const store = new Vuex.Store<State>({
  state: {
    items: [],
    words: [],
  },
  getters: {
    items: ({ items }) => items,
    words: ({ words }) => words,
  },
  mutations: {
    setWords(state, words) {
      state.words = words;
    },

    setItems(state, items) {
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
    }
  }
});