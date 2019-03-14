// Importing Required Libraries and Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const config = require('./var.config');

// Initializing Express
const app = express();

// Implementing CORS 
app.use(cors());

// BodyParser parses incomming data stream into objects that can be used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app;
