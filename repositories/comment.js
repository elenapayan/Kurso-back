"use strict";

const Comment = require("../models/comment");

class CommentRepository {
    constructor() { }
    //Create comment
    async saveComment(comment) {
        const newComment = new Comment(comment);
        const commentSaved = await newComment.save();
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
        console.log(comment);
        return comment;
    };
    //Get all comments
    async getComments() {
        const comment = await Comment.find({}); //De esta forma nos devuelve todo menos los comments y --v
        return comment;
    };
};

module.exports = new CommentRepository();