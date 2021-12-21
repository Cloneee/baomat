const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('Department', DepartmentSchema)