"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    author: { type: "String", required: false },
    nickname: { type: "String", required: true, minlength: 1, maxlength: 20 },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: "String", required: true, minlength: 1, maxlength: 40 },
    content: { type: "String", required: true, minlength: 1, maxlength: 1500 },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Post", PostSchema);