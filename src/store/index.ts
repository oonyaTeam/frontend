import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import axios from 'axios';
import { State, Item, Word } from '../types'
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export const StateKey: InjectionKey<Store<State>> = Symbol();


export const store = createStore({
  state: {
    items: [],
    words: [],
  },
  getters: {
    items: ({ items }) => items,

    allWords: ({ words }) => words,

    monthlyWords: ({ words }: State) => (month: string) => {
      return words.filter(word => word.date.startsWith(month));
    },
    itemsCount: (state, getters) =>{
      return getters.items.length;
    },

    getDiff: (state: State) => (index: number) => {
      if (!index) {
        return state.items[index].sum;
      }
      return state.items[index].sum - state.items[index - 1].sum;
    },
  },
  mutations: {
    setWords(state: State, words: Word[]) {
      state.words = words;
    },

    setItems(state: State, items: Item[]) {
      state.items = items;
    },

    deleteWord(state: State, text: string) {
      const index = state.words.findIndex(word => word.text == text);
      state.words.splice(index, 1);
    },
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

    async deleteWord (context, text: string) {
      await axios.post('https://liverary-api.herokuapp.com/delete', { word: text })
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
        
    }
  }
});


export function useStore() {
  return baseUseStore(StateKey);
}