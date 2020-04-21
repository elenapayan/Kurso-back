"use strict";

const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const offensiveWordsCtrl=require("../controllers/offensiveWords");

//Posts
router.get("/posts", postCtrl.getPosts);
router.get("/posts/:postId", postCtrl.getPostById);
router.post("/posts", postCtrl.savePost);
router.put("/posts/:postId", postCtrl.updatePost);
router.delete("/posts/:postId", postCtrl.deletePost);

//Comments
router.post("/posts/:postId/comment", postCtrl.addComment);
router.put("/comments/:commentId", commentCtrl.updateComment);
router.delete("/comments/:commentId", commentCtrl.deleteComment);

//OffensiveWords
router.get("/offensiveWords", offensiveWordsCtrl.getWords);
router.post("/offensiveWords", offensiveWordsCtrl.saveWord);
router.put("/offensiveWords/:wordId", offensiveWordsCtrl.updateWord);
router.delete("/offensiveWords/:wordId", offensiveWordsCtrl.deleteWord);


module.exports = router;