const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/modules/user');
const userUtils = require('./passport.user.utils');

module.exports = passport => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.user('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({ 'local.email': email }, userUtils.onUserFindOne(err, user, done))
        })
    }))
}

function onUserFindOne(err, user) {
    if (err) return done(err);

    if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
    } else {
        // Create the user
        const newUser = new User();

        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);

        newUser.save((err) => {
            if (err) throw err;

            return done(null, newUser);
        })
    }
}