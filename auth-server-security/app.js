const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv/config')
const cors = require('cors')

const apiRouter = require('./routes/api')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({origin: 'http://localhost:8080'}))
app.use('/api/v1', apiRouter)

module.exports = app;
