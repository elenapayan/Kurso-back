"use strict";

//Express
const express = require("express");
const router = express.Router();
//Passport
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
//Controllers
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const offensiveWordsCtrl = require("../controllers/offensiveWords");
const userCtrl = require("../controllers/user");
//Middlewares
const OffensiveValidator = require("../middlewares/offensiveValidator");
const basicAuth = require("../middlewares/basicAuth");
//BasicAuth
const verify = basicAuth.verify;
passport.use(new BasicStrategy(verify));
router.use(passport.initialize());

//Posts
router.get("/posts", passport.authenticate('basic', { session: false }), postCtrl.getPosts);
router.get("/posts/:postId", postCtrl.getPostById);
router.post("/posts", postCtrl.savePost);
router.put("/posts/:postId", postCtrl.updatePost);
router.delete("/posts/:postId", postCtrl.deletePost);

//Comments
router.post("/posts/:postId/comment", OffensiveValidator.checkwords, postCtrl.addComment);
router.put("/comments/:commentId", OffensiveValidator.checkwords, commentCtrl.updateComment);
router.delete("/comments/:commentId", commentCtrl.deleteComment);

//OffensiveWords
router.get("/offensiveWords", offensiveWordsCtrl.getWords);
router.post("/offensiveWords", offensiveWordsCtrl.saveWord);
router.put("/offensiveWords/:wordId", offensiveWordsCtrl.updateWord);
router.delete("/offensiveWords/:wordId", offensiveWordsCtrl.deleteWord);

//Users
router.post("/login", userCtrl.saveUser);


module.exports = router;