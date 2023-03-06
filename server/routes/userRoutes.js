const express = require("express")
const router = express.Router();
const controllers = require("../controllers/usersControllers");
const Authenticate = require("../middlewares/authmiddleware");
const upload = require("../multerconfig/storageConfig")

router.post("/register", upload.single("user_profile"), controllers.registerfunc)
router.post("/login", controllers.loginfunc)
router.get('/getuserdata', Authenticate, controllers.getuserdata)
router.post('/applytutor', upload.single("doc_profile"), Authenticate, controllers.tutorapplyfunc)

router.post('/getallnotification', Authenticate, controllers.notificationcontroller)

router.post('/deleteallnotification', Authenticate, controllers.deleteallnotificationcontroller)

router.get('/getallapprovedtutors', Authenticate, controllers.getallapprovedtutorscontroller)
router.get('/getrefreshtoken', Authenticate, controllers.getRefreshToken)


router.get('/logout', (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send("User Logout")
})



module.exports = router