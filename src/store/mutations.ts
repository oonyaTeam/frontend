import { MutationTree } from 'vuex';
import {State, Word, Item, Leaf, RankingWord} from '@/types';

const mutations: MutationTree<State> = {
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

	setRanking(state: State, rankingWords: RankingWord[]){
		state.rankingWords = rankingWords;
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

	setDate(state: State, date: string) {
		state.date = date;
	},
};

export default mutations;
