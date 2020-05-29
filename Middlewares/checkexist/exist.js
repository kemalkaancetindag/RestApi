const asyncErrorWraper = require("express-async-handler");
const CustomError = require("../../Helpers/error/CustomError");
const Discusion = require("../../Models/Discusion");
const User = require("../../Models/User");


const checkUserExist = asyncErrorWraper(async (req,res,next) => {

    const {id} = req.params;

    

    const user = await User.findById(id);

    if(user == null){
        return next(new CustomError("There Is No Such An User",400));
    }

    return next();

})

const checkDiscusionExist = asyncErrorWraper(async (req,res,next) => {
    const {discusion_id} = req.params;

    const discusion = await Discusion.findById(discusion_id);

    if(!discusion){
        return next(new CustomError("There Is No Such A Discusion",400));
    }

    next();

    



})

const checkIdeaExist = asyncErrorWraper(async (req,res,next) => {
    const {id} = req.params;

    const discusion = Discusion.findById(id);

    if(!discusion){
        return next(new CustomError("There Is No Such An Idea",400));
    }

    next();
})



module.exports = {checkUserExist,checkDiscusionExist,checkIdeaExist};