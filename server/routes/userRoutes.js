const express = require("express")
const router = express.Router();
const controllers = require("../controllers/usersControllers")
const upload = require("../multerconfig/storageConfig")

router.post("/register", upload.single("user_profile"), controllers.registerfunc)
// router.post("/login", controllers.loginfunc)


module.exports = router