"use strict";

const CommentRepository = require("../repositories/comment");

class CommentController {
    constructor() { }

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
}


module.exports = new CommentController();