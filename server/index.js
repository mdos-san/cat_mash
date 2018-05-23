const express = require('express');
const Server = require('./core/Server');

let server = new Server(express);
server.run();