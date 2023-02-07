const { json } = require('body-parser');
const User = require('../db/models/user');

class UserController {
    async createUser(req, res) {
        const userName = req.body.userName;
        const userSurname = req.body.userSurname;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        const userRepeatPassword = req.body.userRepeatPassword;
        let newUser;
        try {
            if (userPassword === userRepeatPassword) {
                newUser = new User({
                    name: userName,
                    surname: userSurname,
                    email: userEmail,
                    password: userPassword,
                });

                await newUser.save().then(() => {
                    console.log('User has been created');
                });
            } else {
                console.log('Repeated password is not the same');
                return res.status(404).json({ message: 'Repeated password is not the same'});
            }
        } catch (err) {
            return res.status(422).json({ message: err.message });
        }

        res.status(201).json(newUser);
    }
}

module.exports = new UserController();
