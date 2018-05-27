const express = require('express');
const Server = require('./core/Server');
const bodyparser = require('body-parser');

// Routes
const routes = require('./routes.json');

// Ressources
const cats = require('./cats.json');

// Handlers
const VoteHandler = require('./handlers/Vote');
const handlers = {
    Vote: new VoteHandler(cats.images)
};

let server = new Server(express, routes, handlers, bodyparser);
server.run();