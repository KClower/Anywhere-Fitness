const express = require('express');


const session = require("express-session");
// const { ConnectSessionKnexStore } = require('connect-session-knex');
const { knexStore } = require('./store-config.js')
const cors = require('cors');


const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router.js');
const classTypeRouter = require('./classType/rf-class-type-router.js');
const classIntensityRouter = require('./classIntensity/rf-class-intensity-router.js');
const instructorsRouter = require('./instructors/instructors-router.js');
const instructorClasses = require('./instructorClasses/instructor-classes-router.js');
const clientClasses = require('./clientClasses/client-classes-router.js');


const auth = require('./auth/auth-middleware.js');

const server = express();

server.use(cors({
    origin: [
        "http://localhost:5173"
    ],
    credentials: true
}))

const sessionConfiguration = {
    name: 'monster', // default value is sid
    secret: process.env.SESSION_SECRET || 'keep it safe',  // key for encryption
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.USE_SECURE_COOKIES || false, // send the cookie only over https (secure connection)
        httpOnly: true,  // prevent JS code on client from accessing THIS cookie  
    },
    resave: false,
    saveUninitialized: true, // read docs, it's related to GDPR compliance
    store: knexStore,

};

server.use(session(sessionConfiguration)); // enables session support
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/type', classTypeRouter);
server.use('/api/intensity', classIntensityRouter);
server.use('/api/instructors', instructorsRouter);
server.use('/api/instructor', instructorClasses);
server.use('/api/client', clientClasses);

server.get('/', (req, res) => {
    res.status(200).json(`<h2>Welcome to the Anytime Fitness API</h2>`)
})




module.exports = server;