// server.js
// where your node app starts

// init project
"use strict";

const express = require('express');
// creating a express app instance
const app = express();
const timeStamp = require('./app');

app.set('port', process.env.port || 4000);

app.use(express.static('public'));

app.use(timeStamp.router);

app.listen(app.get('port'), () => {console.log("Time stamp server is listening on port 4000")});
