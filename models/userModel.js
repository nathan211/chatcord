const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
})

exports.User = mongoose.model('User', userSchema);