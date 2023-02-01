const express = require('express');
const router = express.Router();

const RoomControllers = require('../controllers/api/roomsController');

//get all rooms
router.get('/getRoom', RoomControllers.getRoom);
//create new room
router.post('/createRoom', RoomControllers.createRoom);
//edit room
router.put('/editRoom/:id', RoomControllers.editRoom);
//delete room
router.delete('/deleteRoom/:id', RoomControllers.deleteRoom);




module.exports = router;