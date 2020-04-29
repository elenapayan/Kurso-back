"use strict";

const Comment = require("../models/comment");

class CommentRepository {
    constructor() { }

    async getCommentById(commentId) {
        const comment = await Comment.findById(commentId);
        return comment;
    };

    async addComment(comment, authorId) {
        const newComment = new Comment({
            nickname: comment.nickname,
            comment: comment.comment,
            authorId: authorId
        });
        const commentSaved = await newComment.save();
        return commentSaved;
    };

    async updateComment(commentId, comment) {
        const newComment = await Comment.findByIdAndUpdate(commentId, comment, { new: true });
        return newComment;
    };

    async deleteComment(commentId) {
        const comment = await Comment.findByIdAndDelete(commentId);
        return comment;
    };
};

module.exports = new CommentRepository();