const express = require("express")
const router = express.Router()

const controllers = require("../controllers/adminCtrl")
const Authenticate = require("../middlewares/authmiddleware");


router.get("/getallusers", Authenticate, controllers.getAllUsersController)
router.get("/getalltutors", Authenticate, controllers.getAllTutorsController)
module.exports = router