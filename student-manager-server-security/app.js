const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup database
const uri = 'mongodb+srv://user:user@learningmongo1.89tk5.gcp.mongodb.net/SecutityUser?retryWrites=true'
mongoose.Promise = global.Promise
const db = mongoose.connection
mongoose.connect(process.env.DB_CONNECTION || uri, { useNewUrlParser: true, useUnifiedTopology: true})
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
//End DB Section
app.use(cors({origin: "http://localhost:3000"}))
app.use('/auth', authRouter)
app.use('/api/v1', apiRouter);
app.use('*', (req,res)=>{
    res.status(404).json({err: "API not found"})
})

module.exports = app;
