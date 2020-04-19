"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    autor: String,
    nickname: String,
    titulo: String,
    texto: String,
    comentarios: String
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;