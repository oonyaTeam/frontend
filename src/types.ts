export interface Item {
    month: string;
    sum: number;
}

export interface Word {
    date: string;
    text: string;
    isBoundary: boolean;
}

export interface Leaf {
    date: string;
    text: string;
    isBoundary: boolean;
}

export interface RankingWord {
    text: string;
    count: number;
}

export interface State {
    items: Item[];
    words: Word[];
    leafs: Leaf[];
}
