"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
    nickname: { type: "String", required: true, minlength: 1, maxlength: 20 },
    comment: { type: "String", required: true, minlength: 1, maxlength: 350 },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: "Date", default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);