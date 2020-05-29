const express = require('express');
const router = express.Router();
const {
    getAllIdeas,
    getSingleIdea,
    addNewIdea,
    editIdea,
    deleteIdea,
    upVoteIdea,
    downVoteIdea} 
    = require("../Controllers/idea");

const Idea = require("../Models/Idea");
const ideaMiddleware = require("../Middlewares/query/ideaMiddleware");
const {ideaUpVoteExist,ideaDownVoteExist} = require("../Helpers/votechecks/votechecks");
const {getAccessToRoute,ideaOwnerPerm} = require("../Middlewares/authorization/authHelpers");
const {checkDiscusionExist,checkIdeaExist} = require("../Middlewares/checkexist/exist");


//GET
router.get("/:discusion_id/idea",[checkDiscusionExist,ideaMiddleware(Idea)],getAllIdeas);
router.get("/:discusion_id/:id",[checkDiscusionExist,checkIdeaExist],getSingleIdea);
router.get("/:discusion_id/:id/up-vote",[getAccessToRoute,checkDiscusionExist,checkIdeaExist,ideaUpVoteExist],upVoteIdea);
router.get("/:discusion_id/:id/down-vote",[getAccessToRoute,checkDiscusionExist,checkIdeaExist,ideaDownVoteExist],downVoteIdea);
//POST
router.post("/:discusion_id/add-new-idea",checkDiscusionExist,getAccessToRoute,addNewIdea);
//PUT
router.put("/:discusion_id/:id/edit",[getAccessToRoute,checkDiscusionExist,checkIdeaExist,ideaOwnerPerm],editIdea);
//DELETE
router.delete("/:discusion_id/:id/delete",[getAccessToRoute,checkDiscusionExist,checkIdeaExist,ideaOwnerPerm],deleteIdea);

module.exports = router;


