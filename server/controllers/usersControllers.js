const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')

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

