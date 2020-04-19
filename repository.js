"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";

async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log("Connected to Mongo");

}

async function main() {

    await dbConnect();

    app.listen(3000, () => console.log('Server started in port 3000'));
}

main();