import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { State } from '../types'
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export const StateKey: InjectionKey<Store<State>> = Symbol();

const state: State = {
  items: [],
  words: [],
  leafs: [],
}

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export function useStore() {
  return baseUseStore(StateKey);
}
