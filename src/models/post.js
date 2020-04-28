"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    author: { type: "String", required: true },
    nickname: { type: "String", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: "String", required: true },
    content: { type: "String", required: true },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

module.exports = mongoose.model("Post", PostSchema);