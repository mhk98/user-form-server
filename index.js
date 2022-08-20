const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.twvtuvp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {

    try{

        await client.connect();
        const userCollection= client.db('dbUser').collection('user')


        //GET
        app.get('/user', async(req, res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })

        

        //POST
        app.post('/user', async(req, res)=>{
            const values = req.body;
            const result = await userCollection.insertOne(values);
            res.send(result)
        })

    }
    finally{

    }
}

run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send('Crud is running')
});

app.listen(port, () =>{
    console.log('Crud is running', port)
})