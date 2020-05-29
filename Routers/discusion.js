const express = require('express');
const router = express.Router();
const {
    getAllDiscusions,
    getSingleDiscusion,
    addNewDiscusion,
    editDiscusion,
    deleteDiscusion,
    upVoteDiscusion,
    downVoteDiscusion} 
    = require("../Controllers/discusion");
const {getAccessToRoute,discusionOwnerPerm} = require("../Middlewares/authorization/authHelpers");
const {discusionUpVoteExist,discusionDownVoteExist} = require("../Helpers/votechecks/votechecks");
const Discusion = require("../Models/Discusion");
const discusionMiddleware = require("../Middlewares/query/discusionMiddleware");
const {checkDiscusionExist} = require("../Middlewares/checkexist/exist");


//GET
router.get("/",discusionMiddleware(Discusion),getAllDiscusions);
router.get("/:discusion_id",checkDiscusionExist,getSingleDiscusion);
router.get("/:discusion_id/up-vote-discusion",[getAccessToRoute,checkDiscusionExist,discusionUpVoteExist],upVoteDiscusion);
router.get("/:discusion_id/down-vote-discusion",[getAccessToRoute,checkDiscusionExist,discusionDownVoteExist],downVoteDiscusion);
//POST
router.post("/new_discusion",getAccessToRoute,addNewDiscusion);
//PUT
router.put("/:discusion_id/edit",[checkDiscusionExist,getAccessToRoute,discusionOwnerPerm],editDiscusion);
//DELETE
router.delete("/:discusion_id/delete",[checkDiscusionExist,getAccessToRoute,discusionOwnerPerm],deleteDiscusion);

module.exports = router;
