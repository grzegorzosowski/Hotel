const express = require('express');
const router = express.Router();
const passport = require('passport');
const RoomControllers = require('../controllers/roomsController');
const UserController = require('../controllers/userControllers');


//get all rooms
router.get('/getAllRoom', RoomControllers.getAllRoom);
//get room
router.get('/getRoom/:nameRoom', RoomControllers.getRoom);
//create new room
router.post('/createRoom', RoomControllers.createRoom);
router.post('/createUser', UserController.createUser);
//router.post('/login/password', UserController.passportLogin);
router.post('/login/password',
  passport.authenticate('local', { failureRedirect: '/login1', failureMessage: true }),
  function(req, res) {
    console.log('AAAAAAAAAAAA', req.user);
    res.sendStatus(200);
  });
//edit room
router.put('/editRoom/:id', RoomControllers.editRoom);
//delete room
router.delete('/deleteRoom/:id', RoomControllers.deleteRoom);



module.exports = router;
