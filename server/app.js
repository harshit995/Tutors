require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const connectDB = require('./config/db.js');
const cors = require("cors");
const router = require("./routes/userRoutes")
const routers = require("./routes/adminRoutes")
const tutrouter = require("./routes/tutorRoutes")
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 8000

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser())


app.use(express.json());
app.use(router);
app.use(routers);
app.use(tutrouter);
app.use(morgan('dev'))

connectDB();

app.use("/uploads", express.static("./uploads"))


app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`)
})