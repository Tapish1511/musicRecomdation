const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        default: "netural"
    },
    thumbnail: String
})

module.exports = mongoose.model('songs', songSchema);