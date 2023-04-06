// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
require('dotenv').config();

//STRING CONNECTION
mongoose.connect(process.env.DATABASE_URL)

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: false }));

// Routes / Controllers
const userController = require('./controllers/users');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));