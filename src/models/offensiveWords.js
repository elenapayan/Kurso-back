"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const OffensiveWordsSchema = new Schema({
    word: { type: "String", required: true },
    level: { type: "Number", min: 1, max: 5, required: true }
});

module.exports = mongoose.model("OffensiveWords", OffensiveWordsSchema);