const express = require("express");
const userController = require("../controllers/userController");
const auth = require('../middleware/auth');
const upload = require('../config/upload');

const router = express.Router();


router.post("/sendOtpToEmail", userController.sendOtpToEmail);

router.post("/verifyOtpAndChangePassword", userController.verifyOtpAndChangePassword);

router.post("/updateProfilePicture", auth, upload.single('profilePicture'), userController.updateProfilePicture);

router.post('/follow/:id', auth, userController.followUser); 

router.post('/unfollow/:id', auth, userController.unfollowUser); 

router.get('/followers/:id', userController.getFollowers); 

router.get('/following/:id', userController.getFollowing);

router.get('/suggestions', auth, userController.getSuggestedUsers);

module.exports = router;
