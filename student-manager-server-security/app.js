const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('ssl/server.key', 'utf8');
var certificate = fs.readFileSync('ssl/server.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };


const apiRouter = require('./routes/api');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup database
mongoose.Promise = global.Promise
const db = mongoose.connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
//End DB Section

const corsOptions = {
    credentials: true,
    origin: "https://localhost:3000",
    preflightContinue: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    optionsSuccessStatus: 200,
    allowedHeaders: "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    exposedHeaders: true
}

app.use(cors(corsOptions))
app.use('/auth', authRouter)
app.use('/api/v1', apiRouter);
app.use('*', (req, res) => {
    res.status(404).json({ err: "API not found" })
})
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

module.exports = { httpServer, httpsServer };
