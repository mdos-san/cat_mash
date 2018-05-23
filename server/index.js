const express = require('express');
const Server = require('./core/Server');

const routes = require('./routes.json');
const handlers = {
    Cats: require('./handlers/Cats')
};

let server = new Server(express, routes, handlers);
server.run();