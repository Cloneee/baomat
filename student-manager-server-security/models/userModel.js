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
        type: mongoose.ObjectId,
        ref: 'Department'
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)