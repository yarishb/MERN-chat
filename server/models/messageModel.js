const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
    author: {
        type: Object,
        required: true
    },
    postedAt: {
        type: Date,
        default: Date.now(),
        required:true
    },
    message: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required:true
    }
})

module.exports = Message = mongoose.model("message", messageSchema)