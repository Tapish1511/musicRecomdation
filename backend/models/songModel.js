const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: String,
    url: String,
    tag: String,
    thumbnail: String
})

module.exports = mongoose.model('songs', songSchema);