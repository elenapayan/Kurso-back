"use strict";

const PostRepository = require("../repositories/post");

class PostService {
    constructor() { }

    //Get all posts
    async getPosts() {
        const post = await PostRepository.getPosts();
        return post;
    }

    //Get one post by id
    async getPostById(postId) {
        const post = await PostRepository.getPostById(postId);
        return post;
    }

    //Delete one post by id
    async deletePost(postId) {
        const post = await PostRepository.deletePost(postId);
        return post;
    }

    //Modify one post
    async updatePost(postId, newPost) {
        const post = await PostRepository.updatePost(postId, newPost);
        return post;
    }

    //Create post
    async savePost(newPost) {
        const post = await PostRepository.savePost(newPost);
        return post;
    }
    
    //Add comment
    async addComment(postId, comment) {
        const newComment = await PostRepository.addComment(postId, comment);
        return newComment;
    }

}

module.exports = new PostService();