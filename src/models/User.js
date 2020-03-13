const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * @type {mongoose.Schema}
 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.default.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' });
            }
        }
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
    },

    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {

    const user = this;
    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}
/**
 * @type {Function}
 */
userSchema.statics.findByCredentials = async function (email, password) {
    let user;
    try {
        user  = await User.findOne({ email });
        if (!user) {
            throw new Error({ error: 'Invalid login credentials' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' });
        }
        return user;
    } catch (error) {
        console.error(error);
    }
}
/**
 * @type {mongoose.Document}
 */
const User = mongoose.model('User', userSchema);
module.exports = User;
