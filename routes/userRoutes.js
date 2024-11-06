const express = require("express");
const userController = require("../controllers/userController");
const auth = require('../middleware/auth');
const upload = require('../config/upload');

const router = express.Router();


router.post("/sendOtpToEmail", userController.sendOtpToEmail);

router.post("/verifyOtpAndChangePassword", userController.verifyOtpAndChangePassword);

router.post("/updateProfilePicture", auth, upload.single('profilePicture'), userController.updateProfilePicture);

module.exports = router;
