const express = require("express")
const router = express.Router();
const controllers = require("../controllers/usersControllers");
const Authenticate = require("../middlewares/authmiddleware");
const upload = require("../multerconfig/storageConfig")

router.post("/register", upload.single("user_profile"), controllers.registerfunc)
router.post("/login", controllers.loginfunc)
router.get('/getuserdata', Authenticate, controllers.getuserdata)



module.exports = router