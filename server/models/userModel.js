const mongoose = require('mongoose');
const validator = require("validator")
const jwt = require('jsonwebtoken')


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
    isAdmin: {
        type: Boolean,
        default: false
    },
    isTutor: {
        type: Boolean,
        default: false
    },
    notification: {
        type: Array,
        default: []
    },
    seennotification: {
        type: Array,
        default: []
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


//cookies
userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    } catch (error) {
        console.log("error in token..")
    }
}

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;