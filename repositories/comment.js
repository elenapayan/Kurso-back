"use strict";

const Post = require("../models/post");
const Comment = require("../models/comment");

//Create comment
async function saveComment(req, res) {
    const comment = req.body;
    // if (typeof post.autor != 'string' || typeof post.nickname != 'string' || typeof post.titulo != 'string' || typeof post.texto != 'string' || typeof post.comentarios != 'string') {
    //     res.sendStatus(400);

    // if (typeof post.autor != 'string' || typeof post.nickname != 'string' || typeof post.titulo != 'string' || typeof post.texto != 'string') {
    //     res.sendStatus(400);
    // } else {
    const newComment = new Comment({
        nickname: comment.nickname,
        texto: comment.texto,
        fecha: comment.fecha
    });
    // })
    await newComment.save((err, commentSaved) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar en la base de datos:${err}` });
        } else {
            res.status(200).send({ comment: commentSaved });
        }
    });
    // };
}

module.exports = {
    saveComment
}