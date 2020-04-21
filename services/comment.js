"use strict";

const CommentRepository = require("../repositories/comment");

class CommentController {
    constructor() { }

    //Create comment
    async saveComment(newComment) {
        const comment = await CommentRepository.saveComment(newComment);
        return comment;
    }
    //Modify comment
    async updateComment(commentId, newComment) {
        const comment = await CommentRepository.updateComment(commentId, newComment);
        return comment;
    }
    //Delete comment
    async deleteComment(commentId) {
        const comment = await CommentRepository.deleteComment(commentId);
        return comment;
    }
    //Get all comments
    async getComments() {
        const comment = await CommentRepository.getComments();
        return comment;
    }
}


module.exports = new CommentController();