const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');
const tutorModel = require("../models/tutorModel");

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
                // console.log("the token is...", token)

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2512000000),
                    httpOnly: true
                })
                user.password = undefined;
                res.status(200).json(user)
            }

        } else {
            res.status(400).json("incorrect details...")
        }
    } catch (error) {
        res.status(400).json("Error in login..")
    }
}

exports.getRefreshToken = async (req, res) => {
    // console.log(req.userID)
    const user = await userModel.findOne({ _id: req.userID })
    token = await user.generateAuthToken();
    res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2512000000),
        httpOnly: true
    })
    // console.log(user)
    // console.log("user")
    user.password = undefined;
    res.status(200).json(user)
}

exports.getuserdata = async (req, res) => {
    res.send(req.rootuser)
}

exports.tutorapplyfunc = async (req, res) => {
    const file = req.file.filename;
    const { firstname, lastname, email, age, phone, website, address, specialization, experience, feesPerStudent, timings, userId } = req.body;

    if (!firstname || !lastname || !email || !phone || !address || !specialization || !experience || !feesPerStudent || !timings || !age || !file) {
        return res.status(400).json("fill all the fields...")
    }

    try {
        const existingUser = await tutorModel.findOne({ email: email });

        if (existingUser) {
            res.status(401).json("user already exist..")
        }
        else {
            const newTutor = new tutorModel({
                userId, firstname, lastname, email, age, phone, website, address, specialization, experience, feesPerStudent, timings, status: "pending", profile: file
            })

            await newTutor.save();

            // console.log(newTutor)
            const adminUser = await userModel.findOne({ isAdmin: true })
            const notification = adminUser.notification
            notification.push({
                type: 'apply-tutor-request',
                message: `${newTutor.firstname} ${newTutor.lastname} Has Applied For a Tutor Account`,
                data: {
                    tutorId: newTutor._id,
                    name: newTutor.firstname + " " + newTutor.lastname,
                    onClickpath: '/admin/tutors'
                }
            })
            await userModel.findByIdAndUpdate(adminUser._id, { notification });
            res.status(200).json(newTutor)

        }
    }
    catch (error) {
        res.status(400).send("Apply Tutor error....")
    }
}


exports.notificationcontroller = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send(updatedUser);
    }
    catch (error) {
        res.status(400).send("Notification error....")
    }
}

exports.deleteallnotificationcontroller = async (req, res) => {
    try {

        const user = await userModel.findOne({ _id: req.body.userId });

        // console.log(req.body.userId)
        user.seennotification = [];
        user.notification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send(updatedUser);
    }
    catch (error) {
        res.status(400).send("delete error....")
    }
}

exports.getallapprovedtutorscontroller = async (req, res) => {
    const search = req.query.search || ""
    try {
        const tutor = await tutorModel.find({ status: "approved", address: { $regex: search, $options: "i" } })
        res.status(200).json(tutor)
    } catch (error) {
        console.log("error in approved tutors list..")
    }
}
