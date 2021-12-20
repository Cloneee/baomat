const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mssv: {
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