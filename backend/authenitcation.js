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
        const serializedUser = {
            uName: user.name,
            uSurname: user.surname,
            uEmail: user.email,
        };
        process.nextTick(() => {
            return done(null, serializedUser);
        });
    });

    passport.deserializeUser((baseUser, done) => {
        User.findOne({ email: baseUser.uEmail }, (err, user) => {
            done(err, user);
        });
    });
}

const verify = async (userEmail, password, cb) => {
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return cb(null, false);
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return cb(null, false);
        }
        console.log('User has been founded');
        return cb(null, user);
    } catch (err) {
        return cb(err);
    }
};

module.exports = initAuthentication;
