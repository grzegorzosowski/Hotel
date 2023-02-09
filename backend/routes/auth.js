const express = require('express');

const routerAuth = express.Router();

routerAuth.get('/login', function(req, res, next) {
});

module.exports = routerAuth;