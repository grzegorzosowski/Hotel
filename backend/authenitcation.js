const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./db/models/user');
require('./db/mongoose');

function initAuthentication(app) {
    app.use(
        session({
            //secret: process.env.SESSION_SECRET,
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
        })
    );

    passport.use(new LocalStrategy(verify));

    passport.serializeUser((user, done) => {
        console.log('Serialize user: ');
        console.log(user);
        done(null, user.surname);
    });

    passport.deserializeUser((email, done) => {
        done(null, { email: email });
    });
    app.use(passport.initialize());
    app.use(passport.session());
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