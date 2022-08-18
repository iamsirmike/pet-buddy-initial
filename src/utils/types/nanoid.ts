type customAlphabet = (alphabet: string, size: number) => string;

export interface Nanoid {
    customAlphabet : customAlphabet;
  }