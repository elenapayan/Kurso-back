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
            const { role } = req.user;
            const wordId = req.params.wordId;
            if (role === "admin") {
                const newWord = await OffensiveWordsService.deleteWord(wordId);
                res.status(200).send(newWord);
            } else {
                res.status(401).send({ message: "No tienes permiso para eliminar esta palabra ofensiva" });
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    async saveWord(req, res, next) {
        try {
            const { role } = req.user;
            const word = req.body;
            if (typeof word.word != 'string' || typeof word.level != 'number') {
                res.status(400).send({ message: "La palabra debe tener los campos word y level" });
            } if (role === "admin") {
                const newWord = await OffensiveWordsService.saveWord(word);
                res.status(200).send(newWord);
            } else {
                res.status(401).send({ message: "No tienes permiso para crear palabras ofensivas" });
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
            const word = req.body;
            const { role } = req.user;
            if (typeof word.word != 'string' || typeof word.level != 'number') {
                res.status(400).send({ message: "La palabra debe tener los campos word y level" });
            } if (role === "admin") {
                const newWord = await OffensiveWordsService.updateWord(wordId, word);
                res.status(200).send(newWord);
            } else {
                res.status(401).send({ message: "No tienes permiso para modificar palabras ofensivas" });
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }
}


module.exports = new OffensiveWordsController();