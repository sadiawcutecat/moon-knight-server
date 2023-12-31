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
    app.post('/api/jeweller',async (req, res) => {
        const jeweller = req.body;
        console.log(jeweller);
        const result = await jewellerCollection.insertOne(jeweller);
        res.send(result);
    });

    app.get('/api/allJewellers', async(req, res) =>{
        console.log(req.body);
        const result = await jewellerCollection.find({}).toArray();
        console.log(result);
        res.send(result);
      })

      app.get('/api/myJewellers', async (req, res) => {
        try {
          const em = req.params.email;
          console.log(em);
        
          const result = await jewellerCollection.findOne({ email: em });
          console.log(result);
        
          res.send(result);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      });

      app.put('/api/myJewellers/:id', async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updateJewellers = req.body;
        console.log(updateJewellers);
        const updateDoc = {
            $set: {
                status: updateToys.status
            },
        };
        const result = await jewellerCollection.updateOne(filter, updateDoc);
        res.send(result);
      })

      app.delete('/api/myJewellers/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }
        const result = await jewellerCollection.deleteOne(query);
        res.send(result);
      })

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