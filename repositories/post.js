"use strict";

const Post = require("../models/post");
const Comment = require("../models/comment");
// let Post;


class PostRepository {
    constructor() { }

    //Get all posts
    async getPosts() {
        const post = await Post.find({}).select({ comments: 0, __v: 0 }); //De esta forma nos devuelve todo menos los comments y --v
        return post;
    };

    //Get one post by id
    async getPostById(postId) {
        const post = await Post.findById(postId);
        return post;
    };

    //Delete one post by id
    async deletePost(postId) {
        const post = await Post.findByIdAndDelete(postId);
        return post;
    };

    //Modify one post
    async updatePost(postId, post) {
        const newPost = await Post.findByIdAndUpdate(postId, post, {new:true}); //{new:true} hace que cuando actualizamos el post nos muestre el post ya actualizado, sino nos muestra el post tal cual estaba antes de la modificación
        return newPost;
    };

    //Create post
    async savePost(post) {
        const newPost = new Post(post);
        const postSaved = await newPost.save();
        return postSaved;
    };
};

module.exports = new PostRepository();