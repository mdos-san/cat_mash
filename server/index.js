const express = require('express');
const Server = require('./core/Server');

// Routes
const routes = require('./routes.json');

// Ressources
const cats = require('./cats.json');

// Handlers
const Cats = require('./handlers/Cats');
const handlers = {
    Cats: new Cats(cats.images)
};

let server = new Server(express, routes, handlers);
server.run();