"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const api = require("./routes/index");
const populateOW = require("./db/load_offensiveWords");
const populateUsers = require("./db/load_admins");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);


async function dbConnect() {
    await mongoose.connect("mongodb://admin:admin@localhost:27018/blogDB?authSource=admin", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });
}

async function main() {
    await dbConnect();
    populateOW.populateOffensiveWords();
    populateUsers.populateUsers();
    app.listen(3000);
}

main();

module.exports = app;