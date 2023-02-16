require('dotenv').config()
const express = require('express');
const app = express();
// const morgan = require('morgan');
const connectDB = require('./config/db.js');
const cors = require("cors");
// const cookieParser = require('cookie-parser')
const router = require("./routes/userRoutes")
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());
app.use(router);
// app.use(cookieParser())
connectDB();

app.use("/uploads", express.static("./uploads"))


app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`)
})