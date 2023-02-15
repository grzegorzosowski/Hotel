const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./db/models/user');
require('./db/mongoose');

function initAuthentication(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(verify));

    passport.serializeUser((user, done) => {
        console.log('SERIALIZEuser function STARTED');
        process.nextTick(() => {
            return done(null, {
                uName: user.name,
                uSurname: user.surname,
                uEmail: user.email,
            });
        });
        console.log('Serialize user: ');
        console.log(user);
    });

    passport.deserializeUser((baseUser, done) => {
        console.log('Deserialize user: ', baseUser);
        User.findOne({ email: baseUser.uEmail }, (err, user) => {
            console.log('FIND ONE AGAIN: ', err, user);
            done(err, user);
        });
    });
}

const verify = (userEmail, password, cb) => {
    console.log('Krzyś chciał Cię zobaczyć', userEmail, password, cb);
    User.findOne({ email: userEmail }, (err, user) => {
        console.log('FIND ONE: ', user, err);
        if (err) {
            return cb(err);
        }
        if (!user) {
            return cb(null, false);
        }
        if (!bcrypt.compare(password, user.password)) {
            return cb(null, false);
        }
        console.log('User has been founded');
        return cb(null, user);
    });
};

module.exports = initAuthentication;
