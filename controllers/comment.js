"use strict";

const CommentService = require("../services/comment");

class CommentController {
    constructor() { }

    //Create comment
    async saveComment(req, res, next) {
        try {
            const comment = req.body;
            const newComment = await CommentService.saveComment(comment);
            if (typeof newComment.nickname != 'string' || typeof newComment.comment != 'string') {
                res.status(400).send({ message: "El comentario debe tener los campos nickname y comment" });
            } else {
                res.status(200).send(newComment);
            }
        } catch (err) {
            res.status(500).send(err.message);
        } finally {
            next();
        }
    }

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

    //Get all comments
    async getComments(req, res, next) {
        try {
            const comment = await CommentService.getComments();
            if (comment !== null) {
                res.status(200).send(comment);
                // res.json(comment);
            } else {
                res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            res.status(404).send(err.message); //Con err.message nos muestra sólo el mensaje de error y no el error completo
        } finally {
            next();//En este ejemplo en concreto no lo necesitaríamos
        }
    }
}


module.exports = new CommentController();