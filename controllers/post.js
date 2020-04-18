"use strict";

const Post = require("../models/post");
// let Post;

async function getPosts(req, res) {
    const post = await Post.find();
    if (!post) {
        res.status(404).send({ message: "No encontrado" });
    } else {
        res.status(200).send({ post });
        // res.json(post);
    }
}
async function getPost(req, res) {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404).send({ message: "No encontrado" });
    } else {
        res.status(200).send({ post });
        // res.json(post);
    }
}
async function deletePost(req, res) {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404).send({ message: "No encontrado" });
    } else {
        await Post.findByIdAndDelete(postId);
        res.status(200).send({ post });
        // res.json(post);
    }
}
async function updatePost(req, res) {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404).send({ message: "No encontrado" });
    } else {
        const postReq = req.body;
        if (typeof postReq.autor != 'string' || typeof postReq.nickname != 'string' || typeof postReq.titulo != 'string' || typeof postReq.texto != 'string' || typeof postReq.comentarios != 'string') {
            res.sendStatus(400);
        } else {
            post.autor = postReq.autor;
            post.nickname = postReq.nickname;
            post.titulo = postReq.titulo;
            post.texto = postReq.texto;
            post.comentarios = postReq.comentarios;
            await post.save();// await Post.findByIdAndUpdate(postId, post);
            res.status(200).send({ post });
        }
    }
}
async function savePost(req, res) {
    const post = req.body;
    if (typeof post.autor != 'string' || typeof post.nickname != 'string' || typeof post.titulo != 'string' || typeof post.texto != 'string' || typeof post.comentarios != 'string') {
        res.sendStatus(400);
    } else {
        const newPost = new Post({
            autor: post.autor,
            nickname: post.nickname,
            titulo: post.titulo,
            texto: post.texto,
            comentarios: post.comentarios
        })
        await newPost.save((err, postSaved) => {
            if (err) {
                res.status(500).send({ message: `Error al guardar en la base de datos:${err}` });
            } else {
                res.status(200).send({ post: postSaved });
            }
        });
    };
}

module.exports = {
    getPost,
    getPosts,
    deletePost,
    updatePost,
    savePost
}