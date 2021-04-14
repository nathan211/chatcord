const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

module.exports = mongoose.model('Message', messageSchema);