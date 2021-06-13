// REQ
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');


dotenv.config({path: 'config.env'});

const PORT = process.env.PORT || 3041;


const connectDB = require('./server/database/connection');
const { Session } = require('inspector');

var app = express();

// parse requests
app.use(bodyparser.urlencoded({extended:true}));

// set view engine
app.set('view engine','ejs');
// app.set('views',path.resolve(__dirname,'views/'));

// assests
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));

// Log Requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// sessions
app.use(session({
 secret: 'secret-key',
 resave: false,
 saveUninitialized: false,
 cookie: {
    maxAge: 36000000,
    httpOnly: false // <- set httpOnly to false
  },
}));

// Router
app.use('/',require('./server/routes/router'));



app.listen(PORT,()=>{
    console.log('[EXPRESS] Server Running on Port ' + PORT + ' ...');
});