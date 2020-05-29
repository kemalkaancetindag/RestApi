const express = require('express');

const router = express.Router();
const {loginUser,logoutUser,registerUser,resetPassword,imageUpload} = require("../Controllers/auth");

const {getAccessToRoute} = require("../Middlewares/authorization/authHelpers");
const profileImageUpload = require("../Middlewares/profileimg/profilimg");

router.post("/login",loginUser);
router.post("/register",registerUser);
router.post("/forgot_password",resetPassword);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);



router.get("/logout",getAccessToRoute,logoutUser);


module.exports = router;