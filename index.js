const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion } = require('mongodb');



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k8hkv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const database = client.db("car-allServices");
        const dbCollection = database.collection("service");

        // POST Api

        app.post('/service', async (req, res) => {
            const service = req.body;
            const result = await dbCollection.insertOne(service);
            res.json(result)
        })

        // Get all data api
        app.get('/services', async (req, res) => {
            const cursor = dbCollection.find({})
            const services = await cursor.toArray();
            res.send(services);
            console.log(services);
        })
        // Find a single data 
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await dbCollection.findOne(query);
            res.json(result);
            console.log(result);
        });

        // DELETE API

        app.delete('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id :ObjectId(id)};
            const result = await dbCollection.deleteOne(query);
            console.log(result);
            res.json(result);
        })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('setup done ..')
})


app.listen(port, () => {
    console.log(`listening to port ${port}`);
})