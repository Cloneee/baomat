const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mssv: {
        type: String
    },
    class:{
        type: String
    },
    department:{
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    }

})

module.exports = mongoose.model('UserModel', UserSchema)