import Vuex from 'vuex';
import axios from 'axios';
import { State, Item, Word } from '../types'


// apiが修正されたら消す
function wordNumList2items(wordNumList: Map<string, number>): Array<Item> {
  return Object.entries(wordNumList)
    .map(([key, value]) => ({'month': key, 'sum': value}));
}

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
          const items: Array<Item> = wordNumList2items(itemsResp.data.word_num_list) // apiが修正されたら消す
          context.commit('setItems', items);
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
        .then((resp) => {console.log('delete')})
        .catch(err => console.log(err));
    }
  }
});
