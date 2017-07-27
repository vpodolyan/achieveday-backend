const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    }
});

userSchema.methods.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
userSchema.methods.validPassword = password => bcrypt.compareSync(password, this.local.password);

module.exports = mongoose.model('User', userSchema);