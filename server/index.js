const express = require('express');
const Server = require('./core/Server');

// Routes
const routes = require('./routes.json');

// Handlers
const Cats = require('./handlers/Cats');
const handlers = {
    Cats: new Cats()
};

let server = new Server(express, routes, handlers);
server.run();