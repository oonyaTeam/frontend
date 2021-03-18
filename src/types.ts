export interface Item {
    month: string;
    sum: number;
}

export interface Word {
    date: string;
    text: string;
}

export interface State {
    items: Item[];
    words: Word[];
    jwt: string,
}