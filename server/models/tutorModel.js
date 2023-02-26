const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        firstname: {
            type: String,
            required: [true, "first name is required"],
        },
        lastname: {
            type: String,
            required: [true, "last name is required"],
        },
        profile: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: [true, "phone no is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        website: {
            type: String,
        },
        address: {
            type: String,
            required: [true, "address is required"],
        },
        specialization: {
            type: String,
            required: [true, "specialization is require"],
        },
        experience: {
            type: String,
            required: [true, "experience is required"],
        },
        feesPerStudent: {
            type: Number,
            required: [true, "fee is required"],
        },
        status: {
            type: String,
            default: "pending",
        },
        age: {
            type: Number,
            required: [true, "Age is required"]
        },
        timings: {
            type: String,
            required: [true, "work timing is required"],
        },
    },
    { timestamps: true }
);

const tutorModel = mongoose.model("tutors", tutorSchema);
module.exports = tutorModel;