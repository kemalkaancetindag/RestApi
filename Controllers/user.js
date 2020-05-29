const asyncErrorWraper = require("express-async-handler");
const User = require("../Models/User");

const getAllUsers = asyncErrorWraper(async (req,res,next) => {
    const users = await User.find();

    res
    .status(200)
    .json({
        success : true,
        data : users
    })
})

const getSingleUser = asyncErrorWraper(async (req,res,next) => {
    const {id} = req.params;
    

    const user = await User.findById(id);

    res
    .status(200)
    .json({
        success : true,
        data : user
    })
})

const voteUser = asyncErrorWraper(async (req,res,next) => {
    const {id} = req.params;

    const user = User.findById(id);

    user.user_votes.push(id);

    user.user_vote_count = user.user_votes.length();

    await user.save();

    res
    .status(200)
    .json({
        success : true,
        data : user
    })
})



module.exports = {getAllUsers,getSingleUser,voteUser};