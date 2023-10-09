const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
//jewelleryShop
//NQI9M7Ofoavnv1RJ

app.use(cors());
app.use(express.json());

run().catch(console.dir);


 app.get('/', (req, res)=>{
    res.send('server is running')
 })
//  app.get('/customerComment',(req, res)=>{
//    res.send(customerComment);
//   //  console.log(customerComment);
//  })

 app.listen(port, ()=>{
    console.log(`toy server is running: ${port}`);
 })