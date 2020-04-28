"use strict";

const Post = require("../models/post");
const CommentRepository = require("./comment");

class PostRepository {
    constructor() { }

    async getPosts() {
        const post = await Post.find({}).select({ comments: 0, __v: 0 }); //De esta forma nos devuelve todo menos los comments y --v
        return post;
    };

    async getPostById(postId) {
        const post = await Post.findById(postId).populate("comments"); //Aquí ponemos comments porque es el nombre del array en el que insertmamos los comentarios en posts
        return post;
    };

    async deletePost(postId) {
        const post = await Post.findByIdAndDelete(postId);
        console.log("repo post", post);
        return post;
    };

    async updatePost(postId, post) {
        const newPost = await Post.findByIdAndUpdate(postId, post, { new: true }); //{new:true} hace que cuando actualicemos nos muestre el post ya actualizado, sino nos mostrará el post tal cual estaba antes de la modificación
        return newPost;
    };

    async savePost(post, authorId) {
        const newPost = new Post({
            author: post.author,
            nickname: post.nickname,
            authorId: authorId,
            title: post.title,
            content: post.content
        });
        const postSaved = await newPost.save();
        return postSaved;
    };

    async addComment(postId, comment, authorId) {
        const newComment = await CommentRepository.addComment(comment, authorId);
        const postUpdate = await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } }, { new: true }); //Aquí ponemos comments porque es así como está en el modelo de Post
        return postUpdate;
    };
};

module.exports = new PostRepository();