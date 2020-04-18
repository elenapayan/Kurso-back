"use strict";

const express = require("express");
const posts = express.Router();
const postCtrl = require("../controllers/post");
// console.log(postCtrl.getPosts);


posts.get("/posts", postCtrl.getPosts);
posts.get("/posts/:postId", postCtrl.getPost);
posts.post("/posts", postCtrl.savePost);
posts.put("/posts/:postId", postCtrl.savePost);
posts.delete("/posts/:postId", postCtrl.deletePost);

module.exports = posts;