import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './router';

dotenv.config(); 

const app = express();

app.use(bodyParser.json());

const server = http.createServer(app);
server.listen( 8080 , ()=> console.log("Server running on http://localhost:8080"));

///const MONGO_URL = process.env.DATABASE_URL;
//console.log(MONGO_URL)

const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.6liv3rn.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(MONGO_URL , {retryWrites:true,w:'majority'})
    .then(()=>{
        console.log("database connection successful.")
    })
    .catch((error)=>{
        console.log(error);
    })

app.use("/",router())