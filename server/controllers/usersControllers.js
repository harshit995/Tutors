const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')

//user register
exports.registerfunc = async (req, res) => {
    const file = req.file.filename;
    let { name, email, mobile, location, password } = req.body;

    if (!name || !email || !mobile || !location || !file || !password) {
        res.status(401).json("All Inputs is required..")
    }

    try {
        const preuser = await userModel.findOne({ email: email });

        if (preuser) {
            res.status(401).json("This user already exist in our database...")
        } else {

            const salt = await bcrypt.genSalt(10)
            const hashedpassword = await bcrypt.hash(password, salt)

            password = hashedpassword
            const userData = new userModel({
                name, email, mobile, location, password, profile: file
            });


            await userData.save();
            res.status(200).json(userData);
            console.log("User created successfully......")
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error")
    }
};

exports.loginfunc = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json("incorrect login credentials..")
    }
    try {
        const user = await userModel.findOne({ email: email })
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.status(400).json("incorrect details...")
            } else {
                token = await user.generateAuthToken();
                console.log("the token is...", token)

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2512000000),
                    httpOnly: true
                })

                res.status(200).json(user)
            }

        } else {
            res.status(400).json("incorrect details...")
        }
    } catch (error) {
        res.status(400).json("Error in login..")
    }
}

exports.getuserdata = async (req, res) => {
    res.send(req.rootuser)
}

