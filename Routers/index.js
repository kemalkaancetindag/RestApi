const express = require("express");
const router = express.Router();
const discusion = require("./discusion");
const auth = require("./auth");
const user = require("./user");
const idea = require("./idea");

router.use("/discusions",discusion);
router.use("/auth",auth);
router.use("/user",user);
router.use("/idea",idea);

module.exports = router;