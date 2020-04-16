const mongoose = require("mongoose");
const app = require("./app.js");

const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";

let Post;

app.post("/posts", async (req, res) => {
    console.log(req.body);
    const post = new Post({
        autor: req.body.autor,
        nickname: req.body.nickname,
        titulo: req.body.titulo,
        texto: req.body.texto,
        comentarios: req.body.comentarios
    })
    await post.save((err, postSaved) => {
        if (err) {
            res.status(500).send({ message: `Error al guardar en la base de datos:${err}` });
        } else {
            res.status(200).send({ post: postSaved });
        }
    });
});

app.get("/posts", async (req, res) => {
    const post = await Post.find();
    if (!post) {
        res.status(404).send({ message: "No encontrado" });
    } else {
        res.status(200).send({ post });
        // res.json(post);
    }
    res.status(200).send({ posts: [] });
});

app.get("/posts/:postId", async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404).send({ message: "No encontrado" });
    } else {
        res.status(200).send({ post });
        // res.json(post);
    }
});

app.put("/posts/:postId", async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404).send({ message: "No encontrado" });
    } else {
        post.autor = req.body.autor;
        post.nickname = req.body.nickname;
        post.titulo = req.body.titulo;
        post.texto = req.body.texto;
        post.comentarios = req.body.comentarios;
        await post.save((err, post) => {
            if (err) {
                res.status(500).send({ message: `Error al actualizar en la base de datos:${err}` });
            } else {
                res.status(200).send({ post });
            }
        });
    }
});

app.delete("/posts/:postId", async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404).send({ message: "No encontrado" });
    } else {
        await Post.findByIdAndDelete(postId);
        res.status(200).send({ post });
        // res.json(post);
    }
});


async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log("Connected to Mongo");

    const postSchema = new mongoose.Schema({
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