import express from 'express';
import mongoose from 'mongoose';
import store from './api/models/store.js';

const app = express();

const port = 5500

const mongoURL = "mongodb+srv://santiago2708:159357ivan@cluster0.ghqpnim.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURL,{})

app.use(express.json())

app.post("/api/clients",(req,res)=>{
    let clientData = req.body
    let mongoRecords = []
    clientData.forEach(client => {
        mongoRecords.push({
            firstName: client.firstName,
            phone: client.phone,
            address: client.address
        })
    });

    store.create(mongoRecords).then((err,records) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(records)
        }
    })
})

app.delete("/api/clients", (req,res) => {
    store.deleteMany().then((err) => {
        res.status(500).send(err)
    })
})

app.get('/api/clients',(req,res)=> {
    store.find().then((err,docs) => {
        if (err){
            res.status(500).send(err)
        }else{
            res.status(200).send(docs)
        }
    })
})

app.listen(port, ()=> {
    console.log(`server is listening at http://localhost:${port}`);
})