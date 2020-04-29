"use strict";

const Post = require("../models/post");
const CommentRepository = require("./comment");

class PostRepository {
    constructor() { }

    async getPosts() {
        const post = await Post.find({}).select({ comments: 0, __v: 0 });
        return post;
    };

    async getPostById(postId) {
        const post = await Post.findById(postId).populate("comments");
        return post;
    };

    async deletePost(postId) {
        const post = await Post.findByIdAndDelete(postId);
        return post;
    };

    async updatePost(postId, post) {
        const newPost = await Post.findByIdAndUpdate(postId, post, { new: true }); 
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
        const postUpdate = await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } }, { new: true });
        return postUpdate;
    };
};

module.exports = new PostRepository();