const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { port } = require('./config');
const app = express();
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');

// db
require('./db/mongoose'); 

// parsers
// Content type: application/json
app.use(bodyParser.json());

//cors 
app.use(cors());
// routes
app.use('/', apiRouter);

// server
app.listen(port, () => {
    console.log('Listen on port ' + port);
}); 