export interface Phonetic {
    text: string;
    audio?:string;
}

export interface Definition {
    definition: string;
    example?: string;
    synonyms: string[];
    antonyms: string[];
}
export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: string[];
    antonyms: string[];
}

export interface WordData {
    word: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    sourceUrls: string[];
}

export interface HistoryItem {
    word: string;
    timestamp: number;
    data?: WordData;
}