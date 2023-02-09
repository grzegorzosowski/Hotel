const express = require('express');
const router = express.Router();
const RoomControllers = require('../controllers/roomsController');
const UserController = require('../controllers/userControllers');

//get all rooms
router.get('/getAllRoom', RoomControllers.getAllRoom);
//get room
router.get('/getRoom/:nameRoom', RoomControllers.getRoom);
//create new room
router.post('/createRoom', RoomControllers.createRoom);
router.post('/createUser', UserController.createUser);
router.post('/login/password', UserController.passportLogin);
//edit room
router.put('/editRoom/:id', RoomControllers.editRoom);
//delete room
router.delete('/deleteRoom/:id', RoomControllers.deleteRoom);

module.exports = router;
