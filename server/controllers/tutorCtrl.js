const tutorModel = require("../models/tutorModel")
const userModel = require("../models/userModel")

exports.gettutorinfocontroller = async (req, res) => {
    const { id } = req.params;
    try {
        const userId = id
        const tutor = await tutorModel.findOne({ userId: userId })
        console.log("this id is..")
        console.log(userId)
        res.status(200).json(tutor)
    } catch (error) {
        res.status(200).json("Tutor fetching details error...")
    }
}