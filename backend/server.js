const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const searchSong = require('./routers/searchSong')


const app = express();
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.fztb6pi.mongodb.net/?retryWrites=true&w=majority`

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, "../frontend/build")));
app.use(cors());
app.use(express.json());

async function connectToDB(){
    mongoose.connect(uri).then(()=>{
        console.log("connected")
    });
}
connectToDB();


app.use('/searchSong', searchSong);

app.listen(5000, ()=>{
    console.log("api started");
})