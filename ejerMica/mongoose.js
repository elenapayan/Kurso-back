const mongoose = require('mongoose');
const express = require('express');

const url = "mongodb://admin:admin@localhost:27018/itemsDB?authSource=admin";

const app = express();
app.use(express.json()); //Convert json bodies to JavaScript object

let Item;

function toResponse(doc) {

    if (doc instanceof Array) {
        return doc.map(elem => toResponse(elem));
    } else {
        let ret = doc.toObject({ versionKey: false });
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    }
}

app.post('/items', async (req, res) => {
    const item = req.body;
    //Validation
    if (typeof item.description != 'string' || typeof item.checked != 'boolean') {
        res.sendStatus(400);
    } else {

        const newItem = new Item({
            description: item.description,
            checked: item.checked
        });

        await newItem.save();

        res.json(toResponse(newItem));
    }
});

app.get('/items', async (req, res) => {
    const allItems = await Item.find().exec();
    res.json(toResponse(allItems));
});

app.get('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
        res.sendStatus(404);
    } else {
        res.json(toResponse(item));
    }
});

app.delete('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
        res.sendStatus(404);
    } else {
        await Item.findByIdAndDelete(id);
        res.json(toResponse(item));
    }
});

app.put('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
        res.sendStatus(404);
    } else {
        const itemReq = req.body;
        //Validation
        if (typeof itemReq.description != 'string' || typeof itemReq.checked != 'boolean') {
            res.sendStatus(400);
        } else {

            item.description = itemReq.description;
            item.checked = itemReq.checked;

            await item.save();

            res.json(toResponse(item));
        }
    }
});

async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log("Connected to Mongo");

    var itemSchema = new mongoose.Schema({
        description: String,
        checked: Boolean
    });

    Item = mongoose.model("Item", itemSchema);
}

async function main() {
    
    await dbConnect();

    app.listen(3000, () => console.log('Server started in port 3000'));
}

main();