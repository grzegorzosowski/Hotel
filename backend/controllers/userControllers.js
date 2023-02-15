const { json } = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const passport = require('passport');

const saltRounds = 12;
class UserController {
    passportLogin = passport.authenticate('local');

    async createUser(req, res) {
        const userName = req.body.userName;
        const userSurname = req.body.userSurname;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        const userRepeatPassword = req.body.userRepeatPassword;
        let newUser;

        try {
            if (userPassword === userRepeatPassword) {
                const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
                console.log('Generated hash: ' + hashedPassword);
                newUser = new User({
                    name: userName,
                    surname: userSurname,
                    email: userEmail,
                    password: hashedPassword,
                });

                await newUser.save().then(() => {
                    console.log('User has been created');
                });
            } else {
                console.log('Repeated password is not the same');
                return res.status(404).json({ message: 'Repeated password is not the same' });
            }
        } catch (err) {
            return res.status(422).json({ message: err.message });
        }

        res.status(201).json(newUser);
    }
}

module.exports = new UserController();
