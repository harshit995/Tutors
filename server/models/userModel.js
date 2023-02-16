const mongoose = require('mongoose');
const validator = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not Valid Email")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;