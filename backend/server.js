const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, "../frontend/build")));


app.get('/', (req, res)=>{
    res.send("hello world");
});

app.listen(5000, ()=>{
    console.log("api started");
})