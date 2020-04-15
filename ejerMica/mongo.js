const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const express = require('express');

const url = "mongodb://admin:admin@localhost:27018/itemsDB?authSource=admin";


const app = express();
app.use(express.json()); //Convert json bodies to JavaScript object

let items;

function toResponse(doc) {

    if (doc instanceof Array) {
        return doc.map(elem => toResponse(elem));
    } else {
        let { _id, ...ret } = doc;
        ret.id = doc._id.toString();
        return ret;
    }
}

app.post('/items', async (req, res) => {
    const item = req.body;
    //Validation
    if (typeof item.description != 'string' || typeof item.checked != 'boolean') {
        res.sendStatus(400);
    } else {
        //Create object with needed fields and assign id
        const newItem = {
            description: item.description,
            checked: item.checked
        };
        //Save resource
        await items.insertOne(newItem);
        //Return new resource
        res.json(toResponse(newItem));
    }
});

app.get('/items', async (req, res) => {
    const allItems = await items.find().toArray();
    res.json(toResponse(allItems));
});

app.get('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await items.findOne({ _id: new ObjectId(id) });
    if (!item) {
        res.sendStatus(404);
    } else {
        res.json(toResponse(item));
    }
});

app.delete('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await items.findOne({ _id: new ObjectId(id) });
    if (!item) {
        res.sendStatus(404);
    } else {
        await items.deleteOne({ _id: new ObjectId(id) });
        res.json(toResponse(item));
    }
});

app.put('/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = await items.findOne({ _id: new ObjectId(id) });
    if (!item) {
        res.sendStatus(404);
    } else {
        const itemReq = req.body;
        //Validation
        if (typeof itemReq.description != 'string' || typeof itemReq.checked != 'boolean') {
            res.sendStatus(400);
        } else {
            //Create object with needed fields and assign id
            const newItem = {
                description: itemReq.description,
                checked: itemReq.checked
            };
            //Update resource
            await items.updateOne({ _id: new ObjectId(id) }, { $set: newItem });
            //Return new resource
            newItem.id = id;
            res.json(toResponse(newItem));
        }
    }
});

async function dbConnect() {
    const conn = await MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Connected to Mongo");

    items = conn.db().collection('items');
}

async function main() {
    await dbConnect();
    app.listen(3000, () => { console.log('Server started in port 3000') });
}

main();