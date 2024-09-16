const express = require('express');
const usersRouter = require('./users/users-router.js');
const classTypeRouter = require('./classType/rf-class-type-router.js');
const classIntensityRouter = require('./classIntensity/rf-class-intensity-router.js');
const instructorClasses = require('./instructorClasses/instructor-classes-router.js');
const clientClasses = require('./clientClasses/client-classes-router.js');

const server = express();

server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/type', classTypeRouter);
server.use('/api/intensity', classIntensityRouter);
server.use('/api/instructor', instructorClasses);
server.use('/api/client', clientClasses);

server.get('/', (req, res) => {
    res.status(200).json(`<h2>Welcome to the Anytime Fitness API</h2>`)
})

module.exports = server;