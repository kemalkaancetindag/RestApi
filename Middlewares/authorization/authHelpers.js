const asyncErrorWraper = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {isTokenIncluded,getAccessTokenFromHeader} = require("../../Helpers/jwt/jwt");
const CustomError = require("../../Helpers/error/CustomError");
const Idea = require("../../Models/Idea");
const Discusion = require("../../Models/Discusion");



const getAccessToRoute = asyncErrorWraper((req,res,next) => {

    const {JWT_SECRET_KEY} = process.env;

   if(!isTokenIncluded(req)){
       return next(new CustomError("You Are Not Authorized"),400);
   }

   const accessToken = getAccessTokenFromHeader(req);

   

   jwt.verify(accessToken,JWT_SECRET_KEY,function(err,decoded){
       if(err){
           return next(new CustomError("You Are Not Authorized",400));
       }

       //In Here We Are Getting Our Datas That We Sent And Creating A req.user So We Can Take Our Datas Later On
       req.user = {
           name : decoded.name,
           email : decoded.email,
           id : decoded.id
       }
   })

   next();
})

const discusionOwnerPerm = asyncErrorWraper(async (req,res,next) => {
    const id = req.user.id;
    const {discusion_id}= req.params;

    const discusion = await Discusion.findById(discusion_id);

    if(discusion.user == id){
       return next();
    }

    return next(new CustomError("You Need To Own That Question If You Want To Edit It",401));
    
    
})

const ideaOwnerPerm = asyncErrorWraper(async (req,res,next) => {
    const user_id = req.user.id;
    const {id}= req.params;

    const idea = await Idea.findById(id);

    if(idea.user == user_id){
       return next();
    }

    return next(new CustomError("You Need To Own That Idea If You Want To Edit It",401));
    
    
})



module.exports = {getAccessToRoute,discusionOwnerPerm,ideaOwnerPerm};