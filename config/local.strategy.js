const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

function onAuthenticate(req, email, password, done) {
    process.nextTick(() => {
        User.findOne({ 'local.email': email }, (err, user, done) => {
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
        });
    })
}

module.exports = function getLocalStrategy() {
    return new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, onAuthenticate)
}