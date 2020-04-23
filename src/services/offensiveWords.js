"use strict";

const OffensiveWordsRepository = require("../repositories/offensiveWords");

class OffensiveWordsService {
    constructor() { }

    async getWords() {
        const word = await OffensiveWordsRepository.getWords();
        return word;
    }
    async deleteWord(wordId) {
        const word = await OffensiveWordsRepository.deleteWord(wordId);
        return word;
    }
    async saveWord(word) {
        const newWord = await OffensiveWordsRepository.saveWord(word);
        return newWord;
    }
    async updateWord(wordId, word) {
        const newWord = await OffensiveWordsRepository.updateWord(wordId, word);
        return newWord;
    }
}

module.exports = new OffensiveWordsService();