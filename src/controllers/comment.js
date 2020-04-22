"use strict";

const CommentService = require("../services/comment");

class CommentController {
    constructor() { }

    //Modify comment
    async updateComment(req, res, next) {
        try {
            const commentId = req.params.commentId;
            const newComment = req.body;
            const comment = await CommentService.updateComment(commentId, newComment);
            if (typeof newComment.nickname != 'string' || typeof newComment.comment != 'string') {
                res.status(400).send({ message: "El comentario debe tener los campos nickname y comment" });
            } else {
                res.status(200).send(comment);
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    //Delete comment by id
    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId;
            const comment = await CommentService.deleteComment(commentId);
            if (comment !== null) {
                res.status(200).send(comment);
                // res.json(comment);
            } else {
                res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }
}


module.exports = new CommentController();