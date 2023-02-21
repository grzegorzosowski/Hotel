const bcrypt = require('bcrypt');
const User = require('../db/models/user');

const saltRounds = 12;
class UserController {
    async createUser(req, res) {
        const userName = req.body.userName;
        const userSurname = req.body.userSurname;
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        let newUser;

        try {
            const checkUserExist = await User.findOne({ email: userEmail }, (err, res) => {
                if (err) return err;
            }).clone();
            if (checkUserExist) {
                return res.status(422).json({ message: 'This email already exists inside our user database' });
            }

            const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
            newUser = new User({
                name: userName,
                surname: userSurname,
                email: userEmail,
                password: hashedPassword,
            });
            await newUser.save().then(() => {
                console.log('User has been created');
            });
        } catch (err) {
            return res.status(422).json({ message: err.message });
        }
        return res.status(201).json('User created successfully');
    }

    async editUserData(req, res) {
        const userName = req.body.userName;
        const userSurname = req.body.userSurname;
        const userEmail = req.session.passport.user.uEmail;

        try {
            await User.updateOne({ email: userEmail }, { name: userName, surname: userSurname }, (err, res) => {
                if (err) throw err;
                console.log('1 document has been updated');
            }).clone();
        } catch (err) {
            return res.status(422).json({ message: err.message });
        }
        res.status(201).json({ message: 'Edytowano użytkownika' });
    }

    async editUserPassword(req, res) {
        const userEmail = req.session.passport.user.uEmail;
        const userOldPassword = req.body.userOldPassword;
        const userNewPassword = req.body.userNewPassword;
        const getUser = await User.findOne({ email: userEmail }, (err, res) => {
            if (err) throw err;
        }).clone();

        if (!(await bcrypt.compare(userOldPassword, getUser.password))) {
            return res.status(404).json({ message: 'Old password is wrong' });
        }

        const hashedNewPassword = await bcrypt.hash(userNewPassword, saltRounds);
        if (await bcrypt.compare(userNewPassword, getUser.password)) {
            return res.status(404).json({ message: 'New password is the same as old password' });
        } else {
            await User.updateOne({ email: userEmail }, { password: hashedNewPassword }, (err, res) => {
                if (err) throw err;
            }).clone();
            return res.status(200).json({ message: 'Password updated!' });
        }
    }
}

module.exports = new UserController();
