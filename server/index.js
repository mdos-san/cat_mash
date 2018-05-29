const express = require('express');
const Server = require('./core/Server');
const bodyparser = require('body-parser');

// Config
const psql = require('./config/db');

// Routes
const routes = require('./routes.json');

// Handlers
const VoteHandler = require('./handlers/Vote');
const handlers = {
    Vote: new VoteHandler(psql)
};

let server = new Server(express, routes, handlers, bodyparser, process);
server.run();