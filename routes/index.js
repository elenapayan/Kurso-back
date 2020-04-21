"use strict";

const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");

//Posts
router.get("/posts", postCtrl.getPosts);
router.get("/posts/:postId", postCtrl.getPostById);
router.post("/posts", postCtrl.savePost);
router.put("/posts/:postId", postCtrl.updatePost);
router.delete("/posts/:postId", postCtrl.deletePost);
//Comments
router.post("/comments", commentCtrl.saveComment);
router.put("/comments/:commentId", commentCtrl.updateComment);
router.delete("/comments/:commentId", commentCtrl.deleteComment);
router.get("/comments", commentCtrl.getComments);

router.post("/posts/:postId/comment", postCtrl.addComment);

module.exports = router;