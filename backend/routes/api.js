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
router.post(
    '/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        console.log('AAAAAAAAAAAA', req.user);
        res.sendStatus(200);
    }
);
//edit room
router.put('/editRoom/:id', RoomControllers.editRoom);
//delete room
router.delete('/deleteRoom/:id', RoomControllers.deleteRoom);

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
router.get('/user', loggedIn, function (req, res, next) {
    console.log('User', req.user);
    res.send(req.user);
});

module.exports = router;
