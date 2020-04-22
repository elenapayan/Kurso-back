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
        // En el caso de que no querer saber las palabras
        // const found = words.some(w => offensiveWords.includes(w));
        console.info('Offensive Found', offensivesFound);
        return offensivesFound;
    }

    isOffensiveWord(words, ow) {
        return words.includes(ow.word.toLowerCase());
    }
}

module.exports = new CheckOffensiveValidator();
