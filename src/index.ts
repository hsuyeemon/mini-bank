// Import required modules and libraries
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './router';

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an instance of the Express application
const app = express();

// Use middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Create an HTTP server using Express
const server = http.createServer(app);
// Start the server and listen on port 8080
server.listen(8080, () => console.log("Server running on http://localhost:8080"));

// MongoDB connection URL
// TODO : To find ways to read from .env file
///const MONGO_URL = process.env.DATABASE_URL;
//console.log(MONGO_URL)
const MONGO_URL = 'mongodb+srv://admin:admin@cluster0.6liv3rn.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URL, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log("Database connection successful.")
    })
    .catch((error) => {
        console.log(error);
    })

// Use the router defined in the 'router.js' file for handling routes
app.use("/", router())