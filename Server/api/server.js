const express = require('express');
const usersRouter = require('./users/users-router.js');
const classTypeRouter = require('./classType/rf-class-type-router.js');
const classIntensityRouter = require('./classIntensity/rf-class-intensity-router.js');

const server = express();

server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/type', classTypeRouter);
server.use('/api/intensity', classIntensityRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Anytime Fitness API</h2>`)
})

module.exports = server;