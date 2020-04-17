const mongoose = require("mongoose");
const app = require("./app.js");

const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";

let Post;

app.post("/posts", async (req, res) => {
    const post = req.body;
    if (typeof post.autor != 'string' || typeof post.nickname != 'string' || typeof post.titulo != 'string' || typeof post.texto != 'string' || typeof post.comentarios != 'string') {
        res.sendStatus(400);
    } else {
        const newPost = new Post({
            autor: post.autor,
            nickname: post.nickname,
            titulo: post.titulo,
            texto: post.texto,
            comentarios: post.comentarios
        })
        await newPost.save((err, postSaved) => {
            if (err) {
                res.status(500).send({ message: `Error al guardar en la base de datos:${err}` });
            } else {
                res.status(200).send({ post: postSaved });
            }
        });
    };
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
        const postReq = req.body;
        if (typeof postReq.autor != 'string' || typeof postReq.nickname != 'string' || typeof postReq.titulo != 'string' || typeof postReq.texto != 'string' || typeof postReq.comentarios != 'string') {
            res.sendStatus(400);
        } else {
            post.autor = postReq.autor;
            post.nickname = postReq.nickname;
            post.titulo = postReq.titulo;
            post.texto = postReq.texto;
            post.comentarios = postReq.comentarios;
            await post.save((err, post) => {
                if (err) {
                    res.status(500).send({ message: `Error al actualizar en la base de datos:${err}` });
                } else {
                    res.status(200).send({ post });
                }
            });
        }
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