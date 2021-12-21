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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    description:{
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate:{
        type: Date,
        defaultl: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema)