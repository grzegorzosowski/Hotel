const express = require('express');
const router = express.Router();

const testControllers = require('../controllers/api/rooms');

router.get('/', testControllers.saveRoom);




module.exports = router;