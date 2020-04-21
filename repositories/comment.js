"use strict";

const Comment = require("../models/comment");

class CommentRepository {
    constructor() { }

    //Create comment
    async addComment(comment) {
        const newComment = new Comment(comment);
        const commentSaved = await newComment.save();
        console.log("comentSaved",commentSaved);
        return commentSaved;
    };
    //Modify comment
    async updateComment(commentId, comment) {
        const newComment = await Comment.findByIdAndUpdate(commentId, comment, { new: true });
        return newComment;
    };
    //Delete comment
    async deleteComment(commentId) {
        const comment = await Comment.findByIdAndDelete(commentId);
        return comment;
    };
};

module.exports = new CommentRepository();