const express = require("express")
const router = express.Router()

const controllers = require("../controllers/tutorCtrl")
const Authenticate = require("../middlewares/authmiddleware");

router.get('/gettutorinfo/:id', Authenticate, controllers.gettutorinfocontroller)

module.exports = router