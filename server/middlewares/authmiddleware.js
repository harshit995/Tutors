const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")

const Authenticate = async (req, res, next) => {
    try {

        const token = req.cookies.jwtoken;

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await userModel.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error('User Not Found')
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        res.status(401).send("Unauthorised user...")
        console.log(error)
    }
}



module.exports = Authenticate;