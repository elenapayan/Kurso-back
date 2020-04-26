"use strict";

//.env
require('dotenv').config();
//Express
const express = require("express");
const router = express.Router();
//Passport
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken");
//Controllers
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const offensiveWordsCtrl = require("../controllers/offensiveWords");
const userCtrl = require("../controllers/user");
const userRepo = require("../repositories/user");
//Middlewares
const OffensiveValidator = require("../middlewares/offensiveValidator");
const basicAuth = require("../middlewares/basicAuth");
//BasicAuth
const verify = basicAuth.verify;
passport.use(new BasicStrategy(verify));
router.use(passport.initialize());


const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {

    const user = await userRepo.findUser(payload.username);
    console.log("index", user);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }
}));


//Posts
router.get("/posts", passport.authenticate('jwt', { session: false }), postCtrl.getPosts);
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
router.post("/user", userCtrl.saveUser);
// router.get("/user/:username", userRepo.getUser);

//Login
router.post("/login", passport.authenticate('basic', { session: false }),
    (req, res) => {

        const { username } = req.user;
        const token = jwt.sign({ username }, process.env.SECRET_KEY);

        return res.status(200).json({ message: "Auth Passed", token });
    });


module.exports = router;