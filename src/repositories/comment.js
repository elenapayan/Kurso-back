"use strict";

const Comment = require("../models/comment");

class CommentRepository {
    constructor() { }

    async getCommentById(commentId) {
        console.log("id", commentId);
        const comment = await Comment.findById(commentId);
        return comment;
    };

    async addComment(comment, authorId) {
        console.log(comment);
        console.log(authorId);
        const newComment = new Comment({
            nickname: comment.nickname,
            comment: comment.comment,
            authorId: authorId
        });
        const commentSaved = await newComment.save();
        // console.log("comentSaved",commentSaved);
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