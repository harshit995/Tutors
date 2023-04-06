const express = require("express")
const router = express.Router()

const controllers = require("../controllers/tutorCtrl")
const Authenticate = require("../middlewares/authmiddleware");
const upload = require("../multerconfig/storageConfig");

router.get('/gettutorinfo/:id', Authenticate, controllers.gettutorinfocontroller)

router.put('/updatetutorinfo/:id', upload.single("doc_profile"), Authenticate, controllers.updatetutorinfocontroller)

router.post('/gettutorbyid/:id', Authenticate, controllers.gettutorbyidcontroller)

module.exports = router