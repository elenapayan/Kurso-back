"use strict";

//.env
require('dotenv').config();
const jwt = require("jsonwebtoken");
//Express
const express = require("express");
const router = express.Router();

//Passport
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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

//JwtAuth
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}
const jwtAuth = require("../middlewares/jwtAuth");
const verifyToken = jwtAuth.verifyToken;
passport.use(new JwtStrategy(jwtOpts, verifyToken));


/*ROUTES*/

//Posts
router.get("/posts", postCtrl.getPosts);
router.get("/posts/:postId", postCtrl.getPostById);
router.post("/posts", passport.authenticate('jwt', { session: false }), postCtrl.savePost);
router.put("/posts/:postId", passport.authenticate('jwt', { session: false }), postCtrl.updatePost);
router.delete("/posts/:postId", passport.authenticate('jwt', { session: false }), postCtrl.deletePost);

//Comments
router.post("/posts/:postId/comment", passport.authenticate('jwt', { session: false }), OffensiveValidator.checkwords, postCtrl.addComment);
router.put("/comments/:commentId", OffensiveValidator.checkwords, commentCtrl.updateComment);
router.delete("/comments/:commentId", commentCtrl.deleteComment);

//OffensiveWords
router.get("/offensiveWords", offensiveWordsCtrl.getWords);
router.post("/offensiveWords", offensiveWordsCtrl.saveWord);
router.put("/offensiveWords/:wordId", offensiveWordsCtrl.updateWord);
router.delete("/offensiveWords/:wordId", offensiveWordsCtrl.deleteWord);

//Users
router.post("/user", userCtrl.saveUser);

//Login
router.post("/login", passport.authenticate('basic', { session: false }), (req, res) => {
    console.log(req);
    const body = { role: req.user.role, _id: req.user._id, username: req.user.username }
    const token = jwt.sign({ body }, process.env.SECRET_KEY);
    return res.status(200).json({
        message: 'Auth Passed',
        token: token
    })
});


module.exports = router;