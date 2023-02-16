const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL)
        console.log("Database connected...")
    } catch (error) {
        console.log("database error..")
    }

}

module.exports = connectDB;