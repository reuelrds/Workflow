// Importing Required Libraries and Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const config = require('./var.config');

// Initializing Express
const app = express();

// BodyParser parses incomming data stream into objects that can be used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use("/images", express.static(path.join(config.imageFolder)));

// Implementing CORS 
app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
       "Origin, X-Request-Width, Content-Type, Accept, Authorization");
  res.setHeader(
      'Access-Control-Allow-Methods', 
      "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

module.exports = app;
