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
    getWords(context) {
      axios
        .get('https://liverary-api.herokuapp.com/words')
        .then(resp => {
          context.commit('setWords', resp.data.words)
        })
        .catch(err => console.log(err));
    },

    getItems(context) {
      axios
      .get('https://liverary-api.herokuapp.com/word_num_list')
      .then(resp => {
        context.commit('setItems', resp.data.word_num_list);
      })
    }
  }
});