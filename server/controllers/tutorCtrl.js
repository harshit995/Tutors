const tutorModel = require("../models/tutorModel")
const userModel = require("../models/userModel")

exports.gettutorinfocontroller = async (req, res) => {
    const { id } = req.params;
    try {
        const userId = id
        const tutor = await tutorModel.findOne({ userId: userId })

        console.log(userId)
        res.status(200).json(tutor)
    } catch (error) {
        res.status(200).json("Tutor fetching details error...")
    }
}


exports.updatetutorinfocontroller = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, age, phone, website, address, specialization, experience, feesPerStudent, timings, doc_profile } = req.body;
    const file = req.file ? req.file.filename : doc_profile
    try {
        console.log("the id is")
        console.log(firstname)
        console.log(id)
        const tutor = await tutorModel.findOneAndUpdate({ userId: id }, {
            firstname, lastname, email, age, phone, website, address, specialization, experience, feesPerStudent, timings, profile: file
        }, {
            new: true
        });
        console.log("updated id is")
        console.log(id)
        await tutor.save()
        res.status(200).json(tutor)
    } catch (error) {
        res.status(200).json("error in updating details...")
    }
}

exports.gettutorbyidcontroller = async (req, res) => {
    const { id } = req.params
    try {

        const tutor = await tutorModel.findOne({ _id: id })
        res.status(200).json(tutor)
    } catch (error) {
        res.status(200).json("error ...")
    }
}