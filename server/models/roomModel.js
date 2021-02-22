const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    users: {
        type: [],
        minlength: 1
    },
    creator: {
        type: {},
        required: true
    },
    messages: {
        type: [],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required:true
    },
})

module.exports = Room = mongoose.model("room", roomSchema)