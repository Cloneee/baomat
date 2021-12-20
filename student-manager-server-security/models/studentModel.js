const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mssv: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    class:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('student', StudentSchema)