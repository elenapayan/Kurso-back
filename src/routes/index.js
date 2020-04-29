"use strict";

//.env
// require('dotenv').config();
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
    secretOrKey: "SECRET_KEY"
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
router.get("/comments/:commentId", commentCtrl.getCommentById);
router.post("/posts/:postId/comment", passport.authenticate('jwt', { session: false }), OffensiveValidator.checkwords, postCtrl.addComment);
router.put("/comments/:commentId", passport.authenticate('jwt', { session: false }), OffensiveValidator.checkwords, commentCtrl.updateComment);
router.delete("/comments/:commentId", passport.authenticate('jwt', { session: false }), commentCtrl.deleteComment);

//OffensiveWords
router.get("/offensiveWords", offensiveWordsCtrl.getWords);
router.post("/offensiveWords", passport.authenticate('jwt', { session: false }), offensiveWordsCtrl.saveWord);
router.put("/offensiveWords/:wordId", passport.authenticate('jwt', { session: false }), offensiveWordsCtrl.updateWord);
router.delete("/offensiveWords/:wordId", passport.authenticate('jwt', { session: false }), offensiveWordsCtrl.deleteWord);

//Users
router.post("/user", passport.authenticate('jwt', { session: false }), userCtrl.saveUser);

//Login
router.post("/login", passport.authenticate('basic', { session: false }), (req, res) => {
    try {
        const body = { role: req.user.role, authorId: req.user._id, username: req.user.username }
        const token = jwt.sign({ body }, "SECRET_KEY");
        return res.status(200).send({
            message: 'Auth Passed',
            token: token
        })
    } catch (err) {
        res.status(404).send(err.message);
    } finally {
        next();
    }
});


module.exports = router;