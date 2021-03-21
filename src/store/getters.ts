import { GetterTree } from 'vuex';
import { State } from '@/types';

const getters: GetterTree<State, State> = {
	items: ({ items }: State) => items,

	allWords: ({ words }: State) => words,

	monthlyWords: ({ words }: State) => (month: string) => {
		return words.filter(word => word.date.startsWith(month));
	},
	itemsCount: ({ items }: State) =>{
		return items.length;
	},

	getDiff: (state: State) => (index: number) => {
		if (!index) {
			return state.items[index].sum;
		}
		return state.items[index].sum - state.items[index - 1].sum;
	},

	leafs: ({ leafs }: State) => leafs,

	date: ({ date }: State) => date,
};
  
export default getters;