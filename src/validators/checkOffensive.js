"use strict";

class CheckOffensiveValidator {
    constructor() { }
    check(comment, offensiveWords) {
        const words = comment.toLowerCase().split(' ');
        let offensivesFound = [];
        offensiveWords.map(ow => {
            if (this.isOffensiveWord(words, ow)) {
                offensivesFound = [...offensivesFound, ow];
            }
        })
        return offensivesFound;
    }

    isOffensiveWord(words, ow) {
        return words.includes(ow.word.toLowerCase());
    }
}

module.exports = new CheckOffensiveValidator();
