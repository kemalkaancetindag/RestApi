const express = require('express');
const {checkUserExist} = require("../Middlewares/checkexist/exist");
const router = express.Router();
const User = require("../Models/User");
const {getAllUsers,getSingleUser,voteUser} = require("../Controllers/user");
const {getAccessToRoute} = require("../Middlewares/authorization/authHelpers");
const userMiddleware = require("../Middlewares/query/userMiddleware");
const {userVoteExist} = require("../Helpers/votechecks/votechecks");

router.get("/",userMiddleware(User),getAllUsers);
router.get("/:id",checkUserExist,getSingleUser);
router.get("/:id/vote-user",[getAccessToRoute,checkUserExist,userVoteExist],voteUser);



module.exports = router;