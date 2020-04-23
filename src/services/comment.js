"use strict";

const CommentRepository = require("../repositories/comment");

class CommentService {
    constructor() { }

    async updateComment(commentId, newComment) {
        const comment = await CommentRepository.updateComment(commentId, newComment);
        return comment;
    }
   
    async deleteComment(commentId) {
        const comment = await CommentRepository.deleteComment(commentId);
        return comment;
    }
}

module.exports = new CommentService();