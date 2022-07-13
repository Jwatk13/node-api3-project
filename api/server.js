const express = require('express');

const server = express();

const usersRouter = require('./users/users-router');

const { logger } = require('./middleware/middleware');

// remember express by default cannot parse JSON in request bodies
server.use(express.json());


// global middlewares and the user's router need to be connected here
server.use(logger)
server.use('/api/users', usersRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    customMessage: 'Somthing tragic happened inside Posts router',
    message: error.message,
    stack: error.stack,
  });
});

module.exports = server;
