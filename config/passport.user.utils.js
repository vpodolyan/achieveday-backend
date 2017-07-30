const User = require('../app/models/user');

function onUserFindOne(err, user, done) {
    // return (err, user) => {
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
    // }
}

module.exports = { onUserFindOne }
