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
