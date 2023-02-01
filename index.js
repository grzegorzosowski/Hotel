const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { port } = require('./config');
const app = express();
const apiRouter = require('./routes/api');

require('./db/mongoose'); 

//routes
app.use('/', apiRouter);


app.listen(port, () => {
    console.log('Listen on port ' + port);
});