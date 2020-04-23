"use strict";

const OffensiveWord = require("../models/offensiveWords");

class OffensiveWordsRepository {
    constructor() { }

    async getWords() {
        const word = await OffensiveWord.find({});
        return word;
    };

    async deleteWord(wordId) {
        const word = await OffensiveWord.findByIdAndDelete(wordId);
        return word;
    };

    async saveWord(word) {
        const newWord = new OffensiveWord(word);
        const wordSaved = await newWord.save();
        return wordSaved;
    };

    async updateWord(wordId, word) {
        const newWord = await OffensiveWord.findByIdAndUpdate(wordId, word, { new: true });
        return newWord;
    };
};

module.exports = new OffensiveWordsRepository();