"use strict";

const Comment = require("../models/comment");

class CommentRepository {
    constructor() { }

    async addComment(comment) {
        const newComment = new Comment(comment);
        const commentSaved = await newComment.save();
        console.log("comentSaved",commentSaved);
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