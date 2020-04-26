const validator = require("./checkOffensive");

describe("Should Check offensive words", () => {
    test("Find offensive words", () => {
        const phrase = "Manolo tiene caca";
        const offensiveWords = [{
            word: "caca", 
            level: 2 
        }];
        const checkWords = validator.check(phrase, offensiveWords);
        expect(checkWords.length).toBe(1);
    })
    test("Shouldn't find offensive words", () => {
        const phrase = "Manolo tiene cacao";
        const offensiveWords = [{
            word: "caca", 
            level: 2 
        }];
        const checkWords = validator.check(phrase, offensiveWords);
        expect(checkWords.length).toBe(0);
    })
})