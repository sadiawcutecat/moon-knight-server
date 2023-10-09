const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
//jewelleryShop
//NQI9M7Ofoavnv1RJ

app.use(cors());
app.use(express.json()); // Add this line to enable body parsing


const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://${}:${process.env.DB_PASS}@cluster0.s1xtzuq.mongodb.net/?retryWrites=true&w=majority";
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s1xtzuq.mongodb.net/?retryWrites=true&w=majority`;

// 
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const jewellerCollection = client.db('jewelleryShop').collection('jeweller');

    app.get('/jeweller', async (req, res) => {
        console.log(req.body);
        let query = {};
        if (req.query?.email) {
            query = { email: req.query.email }
        }
        const result = await jewellerCollection.find(query).toArray();
        console.log(result);
        res.send(result);
    })
    app.post('/api/jewellers',async (req, res) => {
        const jewellers = req.body;
        console.log(jewellers);
        const result = await jewellerCollection.insertOne(jewellers);
        res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





 app.get('/', (req, res)=>{
    res.send('server is running')
 })


 app.listen(port, ()=>{
    console.log(`jewellery server is running: ${port}`);
 })