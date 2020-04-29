"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
// const fs = require("fs");
// const https = require("https");
const api = require("./routes/index");
const populateOW = require("./db/load_offensiveWords");
const populateUsers=require("./db/load_admins");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);


async function dbConnect() {
    await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log("Connected to Mongo");
}

async function main() {
    await dbConnect();
    populateOW.populateOffensiveWords();
    populateUsers.populateUsers();
}

main();

module.exports = app;