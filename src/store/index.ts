import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import axios from 'axios';
import { State, Item, Word, Leaf } from '../types'
import getters from './getters';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export const StateKey: InjectionKey<Store<State>> = Symbol();

const state: State = {
  items: [],
  words: [],
  leafs: [],
}

export const store = createStore({
  state,
  getters,
  mutations: {
    setWords(state: State, words: Word[]) {
      state.words = words;
    },

    setItems(state: State, items: Item[]) {
      state.items = items;
    },

    setLeafs(state: State, words: Word[]) {
      const leafs: Leaf[] = words.map((word, index) => {
        if(!index) {
          return { date: word.date, text: word.text, isBoundary: true } as Leaf;
        }
        // '2021-01-20' -> '01'
        const thisMonth: string = word.date.split('-')[1];
        const lastMonth: string = words[index - 1].date.split('-')[1];
        if(thisMonth === lastMonth) {
          return { date: word.date, text: word.text, isBoundary: false } as Leaf;
        }
        return { date: word.date, text: word.text, isBoundary: true } as Leaf;
      })
      state.leafs = leafs;
    },

    deleteWord(state: State, text: string) {
      const wordIndex = state.words.findIndex(word => word.text == text);
      state.words.splice(wordIndex, 1);
      const leafIndex = state.leafs.findIndex(leaf => leaf.text == text);
      if(state.leafs[leafIndex].isBoundary && leafIndex === state.leafs.length) {
        state.leafs[leafIndex + 1].isBoundary = true;
      } 
      state.leafs.slice(leafIndex, 1);
    },
  },
  actions: {
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
  }
});


export function useStore() {
  return baseUseStore(StateKey);
}
