"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
// const fs = require("fs");
// const https = require("https");
const api = require("./routes/index");
const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);


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

    // // Poniendo esto en la terminal - openssl req -nodes -new -x509 -keyout server.key -out server.cert - generamos una key y un certificado inseguro de cara a utilizar https
    // https.createServer({
    //     key: fs.readFileSync('server.key'),
    //     cert: fs.readFileSync('server.cert')
    // }, app).listen(3443, () => {
    //     console.log("Https server started in port 3443");
    // });
}


main();

module.exports = app;