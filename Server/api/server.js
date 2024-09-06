const express = require('express');
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.json());

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Anytime Fitness API</h2>`)
})

module.exports = server;