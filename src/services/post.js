"use strict";

const PostRepository = require("../repositories/post");

class PostService {
    constructor() { }

    async getPosts() {
        const post = await PostRepository.getPosts();
        return post;
    }

    async getPostById(postId) {
        const post = await PostRepository.getPostById(postId);
        return post;
    }

    async deletePost(postId) {
        const post = await PostRepository.deletePost(postId);
        return post;
    }

    async updatePost(postId, newPost) {
        const post = await PostRepository.updatePost(postId, newPost);
        return post;
    }

    async savePost(newPost, authorId) {
        const post = await PostRepository.savePost(newPost, authorId);
        return post;
    }
    
    async addComment(postId, comment) {
        const newComment = await PostRepository.addComment(postId, comment);
        return newComment;
    }

}

module.exports = new PostService();