const express = require('express');
require('dotenv').config();
const router = express.Router();
const passport = require('passport');
const ContactController = require('../controllers/contactController');
const RoomControllers = require('../controllers/roomsController');
const UserController = require('../controllers/userControllers');

router.get('/getAllRoom', RoomControllers.getAllRoom);
router.get('/getRoom/:nameRoom', RoomControllers.getRoom);
router.get('/user', loggedIn, function (req, res, next) {
    res.send(req.user);
});

router.post('/sendMessage', ContactController.sendMessage);
router.post('/createRoom', RoomControllers.createRoom);
router.post('/createUser', UserController.createUser);
router.post('/editUserData', UserController.editUserData);
router.post('/editUserPassword', UserController.editUserPassword);
router.post(
    '/login/password',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.sendStatus(200);
    }
);
router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.sendStatus(200);
    });
});

router.put('/editRoom/:id', RoomControllers.editRoom);
router.delete('/deleteRoom/:id', RoomControllers.deleteRoom);

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = router;
