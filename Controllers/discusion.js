const asyncErrorWraper = require("express-async-handler");
const Discusion = require("../Models/Discusion");
const User = require("../Models/User");

const getAllDiscusions = asyncErrorWraper(async (req,res,next) => {
    const discusions = await Discusion.find();

     res
     .status(200)
     .json({
         success : true,
         data : discusions
     })
});

const getSingleDiscusion = asyncErrorWraper(async (req,res,next) => {
    const {discusion_id} = req.params;

    const discusion = await Discusion.findById(discusion_id);

    res
    .status(200)
    .json({
        success : true,
        data : discusion
    })
});

const editDiscusion = asyncErrorWraper(async (req,res,next) => {
    const {content,about,title} = req.body;

    const {discusion_id} = req.params;

    const discusion = await Discusion.findById(discusion_id);

    discusion.content = content;
    discusion.title = title;
    discusion.about = about;

    await discusion.save()
    
    res
    .status(200)
    .json({
        success : true,
        data : discusion
    })
});

const deleteDiscusion = asyncErrorWraper(async (req,res,next) => {

    const {discusion_id} = req.params;

    await Discusion.findByIdAndRemove(discusion_id);

    user.discusion_count = user.discusions.length();

    await user.save();
    res
    .status(200)
    .json({
        success : true,
        data : "Succesfully deleted discusion"
    })
});

const addNewDiscusion = asyncErrorWraper(async (req,res,next) => {
    const information = req.body;

    //We Get Our Decoded Data And Posted It Here So Now We Are Get These Datas And Use
    const id = req.user.id;



    const user = await User.findById(id);
    
    const discusion = await Discusion.create({
        ...information,
        user : id
    })

    user.discusion_count = user.discusions.length();

    await user.save();

    res
    .status(200)
    .json({
        success : true,
        data : discusion,
        user : user
    })
});

const downVoteDiscusion = asyncErrorWraper(async (req,res,next) => {
    const {discusion_id} = req.params;
    const user_id = req.user.id;

    const discusion = Discusion.findById(discusion_id);

    discusion.down_votes.push(user_id);

    discusion.down_vote_count = discusion.down_votes.length();
    await discusion.save();

    res
    .status(200)
    .json({
        success : true,
        data : discusion
    })
})

const upVoteDiscusion = asyncErrorWraper(async (req,res,next) => {
    const {discusion_id} = req.params;
    const user_id = req.user.id;

    const discusion = Discusion.findById(discusion_id);

    discusion.up_votes.push(user_id);

    discusion.down_vote_count = discusion.down_votes.length();
    await discusion.save();

    res
    .status(200)
    .json({
        success : true,
        data : discusion
    })
})



module.exports = {getAllDiscusions,getSingleDiscusion,editDiscusion,deleteDiscusion,addNewDiscusion,upVoteDiscusion,downVoteDiscusion};