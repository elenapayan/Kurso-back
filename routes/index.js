"use strict";

const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
// const commentCtrl = require("../repositories/comment");
// console.log(postCtrl.getPosts);

//Posts
router.get("/posts", postCtrl.getPosts);
router.get("/posts/:postId", postCtrl.getPostById);
router.post("/posts", postCtrl.savePost);
router.put("/posts/:postId", postCtrl.updatePost);
router.delete("/posts/:postId", postCtrl.deletePost);
//Comments
// router.post("/comments", commentCtrl.saveComment);


module.exports = router;