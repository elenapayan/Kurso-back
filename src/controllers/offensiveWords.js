"use strict";

const OffensiveWordsService = require("../services/offensiveWords");


class OffensiveWordsController {
    constructor() { }

    async getWords(req, res, next) {
        try {
            const word = await OffensiveWordsService.getWords();
            res.status(200).send(word);
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    async deleteWord(req, res, next) {
        try {
            const wordId = req.params.wordId;
            const word = await OffensiveWordsService.deleteWord(wordId);
            if (word !== null) {
                res.status(200).send(word);
                // res.json(word);
            } else {
                res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    async saveWord(req, res, next) {
        try {
            const word = req.body;
            const newWord = await OffensiveWordsService.saveWord(word);
            if (typeof newWord.word != 'string' || typeof newWord.level != 'number') {
                res.status(400).send({ message: "La palabra debe tener los campos word y level" });
            } else {
                res.status(200).send(newWord);
            }
        } catch (err) {
            res.status(500).send(err.message);
        } finally {
            next();
        }
    }

    async updateWord(req, res, next) {
        try {
            const wordId = req.params.wordId;
            const newWord = req.body;
            const word = await OffensiveWordsService.updateWord(wordId, newWord);
            if (typeof newWord.word != 'string' || typeof newWord.level != 'number') {
                res.status(400).send({ message: "La palabra debe tener los campos word y level" });
            } else {
                res.status(200).send(word);
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }
}


module.exports = new OffensiveWordsController();