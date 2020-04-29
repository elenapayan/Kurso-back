"use strict";

const CommentService = require("../services/comment");

class CommentController {
    constructor() { }

    async getCommentById(req, res, next) {
        try {
            const commentId = req.params.commentId;
            const comment = await CommentService.getCommentById(commentId);
            if (comment !== null) {
                res.status(200).send(comment);
                // res.json(comment);
            } else {
                res.status(404).send({ message: "No hay ningún comment con ese ID" });
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    async updateComment(req, res, next) {
        try {
            const commentId = req.params.commentId;
            const newComment = req.body;
            const role = req.user.role;
            const authorId = req.user._id;
            const comment = await CommentService.getCommentById(commentId);
            if (typeof newComment.nickname != 'string' || typeof newComment.comment != 'string') {
                res.status(400).send({ message: "El comentario debe tener los campos nickname y comment" });
            } if (role === "admin" || authorId.equals(comment.authorId)) {
                const commentUpdated = await CommentService.updateComment(commentId, newComment);
                res.status(200).send(commentUpdated);
            } else {
                res.status(401).send({ message: "No tienes permiso para modificar el comentario" });
            }
        } catch (err) {
            res.status(404).send(err.message);
        } finally {
            next();
        }
    }

    async deleteComment(req, res, next) {
        try {
            const commentId = req.params.commentId;
            const role = req.user.role;
            const authorId = req.user._id;
            const comment = await CommentService.getCommentById(commentId);
            if (role === "admin" || authorId.equals(comment.authorId)) {
                const commentDeleted = await CommentService.deleteComment(commentId);
                res.status(200).send(commentDeleted);
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