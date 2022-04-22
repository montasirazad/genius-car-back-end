const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
require('dotenv').config()
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion } = require('mongodb');

/// user name : azad1403
/// pass: 1tRtV7xUk38Vvpd4

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
            console.log(result);
            res.json(result)
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