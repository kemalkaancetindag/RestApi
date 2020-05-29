const asyncErrorWraper = require("express-async-handler");
const CustomError = require("../error/CustomError");
const User = require("../../Models/User");
const Discusion = require("../../Models/Discusion");
const Idea =require("../../Models/Idea");

//Büyük Salaklık Yapıyorum Hepsini Farklı Yazıcam Farkındayım Ama Saat Gece 2 Amk
const ideaUpVoteExist = asyncErrorWraper(async (req,res,next) => {
    const user_id = req.user.id;
    const {id} = req.params;

    const idea = Idea.findById(id);

    if(!idea.up_votes.includes(user_id)){
        return next();
    }

    return next(new CustomError("You Already Voted For This Idea",400));

}) 

const ideaDownVoteExist = asyncErrorWraper(async (req,res,next) => {
    const user_id = req.user.id;
    const {id} = req.params;

    const idea = Idea.findById(id);

    if(!idea.down_votes.includes(user_id)){
        return next();
    }

    return next(new CustomError("You Already Voted For This Idea",400));

}) 

const userVoteExist = asyncErrorWraper(async (req,res,next) => {
    const user_id = req.user.id;
    const {id} =req.params;

    const user = User.findById(id);

    if(!user.user_votes.includes(user_id)){
        return next();
    }

    return next(new CustomError("You Already Voted For That User",400));

})

const discusionUpVoteExist = asyncErrorWraper(async (req,res,next) => {
    const user_id = req.user.id;
    const {discusion_id} = req.params;

    const discusion = Discusion.findById(discusion_id);

    if(!discusion.up_votes.includes(user_id)){
        return next();
    }

    return next(new CustomError("You Already Voted For This Discusion",400));

}) 

const discusionDownVoteExist = asyncErrorWraper(async (req,res,next) => {
    const user_id = req.user.id;
    const {discusion_id} = req.params;

    const discusion = Discusion.findById(discusion_id);

    if(!discusion.down_votes.includes(user_id)){
        return next();
    }

    return next(new CustomError("You Already Voted For This Discusion",400));

}) 


module.exports = {ideaUpVoteExist,ideaDownVoteExist,userVoteExist,discusionDownVoteExist,discusionUpVoteExist};