const express = require('express');
const songs = require('../models/songModel');

const route = express.Router();

route.post('/', (req, res)=>{
    const exper = req.body.tag;
    getSongs(exper, res);
    
})

route.get('/:id', (req, res)=>{
    const id = req.params.id;
    getSongById(id, res);
})

async function getSongs(expr, res){
   const songArr = await songs.find({tag: expr});
   if(songArr.length === 0) res.status(501).json({msg: "no such expression is here"});
   else res.status(201).json(songArr);
}

async function getSongById(id, res){
    const song = await songs.findById(id);
    res.status(200).json(song);
}

module.exports = route;