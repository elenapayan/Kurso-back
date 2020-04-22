"use strict";

const OffensiveWordRepository = require("../repositories/offensiveWords");
const CheckOffensiveValidator = require("../validators/checkOffensive");

class CheckOffensiveWords {
    constructor() { }

    async checkwords(req, res, next) {
        const comment = req.body;
        const offensiveWordsDB = await OffensiveWordRepository.getWords();
        const offensiveWords = offensiveWordsDB.map(owdb => {
            return { word: owdb.word, level: owdb.level }
        });
        const offensiveWordsFound = CheckOffensiveValidator.check(comment.comment, offensiveWords);
        if (offensiveWordsFound.length === 0) {
            next(); ////
        } else {
            const info = offensiveWordsFound.map(ow => ow.word + ' con nivel ' + ow.level);
            res.status(403).send({ message: 'No puedes utilizar: ' + info });
        }
    }
}

module.exports = new CheckOffensiveWords();