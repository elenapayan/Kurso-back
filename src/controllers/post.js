"use strict";

// const OffensiveValidator = require("../middlewares/offensiveValidator");
const PostService = require("../services/post");

class PostController {
    constructor() { }

    //Get all posts
    async getPosts(req, res, next) {
        try {
            const post = await PostService.getPosts();
            res.status(200).send(post);
            // res.json(post);
        } catch (err) {
            res.status(404).send(err.message); //Con err.message nos muestra sólo el mensaje de error y no el error completo
        } finally {
            next();//En este ejemplo en concreto no necesitaríamos el finally ni el next()
        }
    }

    //Get post by id
    async getPostById(req, res, next) {
        try {
            const postId = req.params.postId;
            const post = await PostService.getPostById(postId);
            if (post !== null) {
                res.status(200).send(post);
                // res.json(post);
            } else {
                res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    //Delete post by id
    async deletePost(req, res, next) {
        try {
            const postId = req.params.postId;
            const post = await PostService.deletePost(postId);
            if (post !== null) {
                res.status(200).send(post);
                // res.json(post);
            } else {
                res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    //Create post
    async savePost(req, res, next) {
        try {
            const post = req.body;
            const newPost = await PostService.savePost(post);
            if (typeof newPost.author != 'string' || typeof newPost.nickname != 'string' || typeof newPost.title != 'string' || typeof newPost.content != 'string') {
                res.status(400).send({ message: "El post debe tener los campos author, nickname, title y content" });
            } else {
                res.status(200).send(newPost);
            }
        } catch (err) {
            res.status(500).send(err.message);
        } finally {
            next();
        }
    }

    //Modify post
    async updatePost(req, res, next) {
        try {
            const postId = req.params.postId;
            const newPost = req.body;
            const post = await PostService.updatePost(postId, newPost);
            if (typeof newPost.author != 'string' || typeof newPost.nickname != 'string' || typeof newPost.title != 'string' || typeof newPost.content != 'string') {
                res.status(400).send({ message: "El post debe tener los campos author, nickname, title y content" });
            } else {
                res.status(200).send(post);
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    //Add comment
    async addComment(req, res, next) {
        try {
            const postId = req.params.postId;
            const comment = req.body;
            const updatePost = await PostService.addComment(postId, comment);
            res.status(200).send(updatePost);
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }
}

module.exports = new PostController();