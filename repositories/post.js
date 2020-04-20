"use strict";

const Post = require("../models/post");
const Comment = require("../models/comment");
// let Post;


class PostRepository {
    constructor() { }

    //Get all posts
    async getPosts(req, res) {
        const post = await Post.find({}).select({ comments: 0, __v: 0 }); //De esta forma nos devuelve todo menos los comments y --v
        if (!post) {
            res.status(404).send({ message: "No encontrado" });
        } else {
            res.status(200).send({ post });
            // res.json(post);
            return post;
        }
    }

    //Get one post by id
    async getPostById(req, res) {
        const postId = req.params.postId;
        const post = await Post.findById(postId).populate("Comments"); 
        if (!post) {
            res.status(404).send({ message: "No encontrado" });
        } else {
            res.status(200).send({ post });
            // res.json(post);
            return post;
        }
    }
    //Delete one post by id
    async deletePost(req, res) {
        const postId = req.params.postId;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            res.status(404).send({ message: "No encontrado" });
        } else {
            res.status(200).send({ post });
            // res.json(post);
            return post;
        }
    }
    //Modify one post
    async updatePost(req, res) {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        console.log(post);
        if (!post) {
            res.status(404).send({ message: "No encontrado" });
        } else {
            const postReq = req.body;
            if (typeof postReq.author != 'string' || typeof postReq.nickname != 'string' || typeof postReq.title != 'string' || typeof postReq.content != 'string') {
                res.sendStatus(400);
            } else {
                post.author = postReq.author;
                post.nickname = postReq.nickname;
                post.title = postReq.title;
                post.content = postReq.content;
                await post.save();// 
                // await Post.findByIdAndUpdate(postId, post);
                res.status(200).send({ post });
                return post;
            }
        }
    }
    //Create post
    async savePost(req, res) {
        const post = req.body;
        // if (typeof post.autor != 'string' || typeof post.nickname != 'string' || typeof post.titulo != 'string' || typeof post.texto != 'string' || typeof post.comentarios != 'string') {
        //     res.sendStatus(400);
        if (typeof post.author != 'string' || typeof post.nickname != 'string' || typeof post.title != 'string' || typeof post.content != 'string') {
            res.sendStatus(400);
        } else {
            const newPost = new Post({
                author: post.author,
                nickname: post.nickname,
                title: post.title,
                content: post.content,
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
};

module.exports = new PostRepository;