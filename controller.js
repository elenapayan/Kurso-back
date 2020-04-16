const mongoose = require("mongoose");
const app = require("./app.js");

const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";

let Post;

// app.post("/posts", async(req,res)=>{

// })

app.get("/posts", (req, res) => {
    res.status(200).send({ posts: [] });
})



async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log("Connected to Mongo");

    var postSchema = new mongoose.Schema({
        description: String,
    });

    Post = mongoose.model("Post", postSchema);
}

async function main() {
    
    await dbConnect();

    app.listen(3000, () => console.log('Server started in port 3000'));
}

main();