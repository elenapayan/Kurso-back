const mongoose = require("mongoose");
const app = require("./app.js");

const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";

let Post;

// app.post("/posts", async(req,res)=>{

// })

app.get("/posts", (req, res) => {
    res.status(200).send({ posts: [] });
});

app.get("/posts/postId", (req, res) => {
});

app.post("/posts", (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: "encontrado" });
});

app.put("/posts/postId", (req, res) => {
});

app.delete("/posts/postId", (req, res) => {
});


async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log("Connected to Mongo");

    var postSchema = new mongoose.Schema({
        autor: String,
        nickname: String,
        titulo: String,
        texto: String,
        comentarios: String
    });

    Post = mongoose.model("Post", postSchema);
}

async function main() {

    await dbConnect();

    app.listen(3000, () => console.log('Server started in port 3000'));
}

main();