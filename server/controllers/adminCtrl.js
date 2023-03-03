const tutorModel = require("../models/tutorModel")
const userModel = require("../models/userModel")

exports.getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json("get all users error...")
    }
}

exports.getAllTutorsController = async (req, res) => {
    try {
        const tutors = await tutorModel.find({})
        res.status(200).json(tutors)
    } catch (error) {
        res.status(400).json("get all tutors error...")
    }
}


exports.changeaccountController = async (req, res) => {
    try {
        const { tutorId, status } = req.body
        console.log(tutorId)
        console.log(status)
        const tutor = await tutorModel.findByIdAndUpdate(tutorId, { status })
        // console.log(tutor)
        console.log("after tut")
        const user = await userModel.findOne({ _id: tutor.userId })
        console.log("after user")
        const notification = user.notification
        notification.push({
            type: "tutor-account-request-updated",
            message: `Your Tutor Account is ${status}`,
            onClickPath: '/notification'
        })
        user.isTutor = status === 'approved' ? true : false
        await user.save()
        res.status(200).json(tutor)
    } catch (error) {
        res.status(400).send("account status error...")
    }
}
