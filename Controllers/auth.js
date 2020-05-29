const asyncErrorWraper = require("express-async-handler");
const CustomError = require("../Helpers/error/CustomError");
const {sendJwtToClient} = require("../Helpers/jwt/jwt");
const {sendEmail} = require("../Helpers/mailer/mailer");
const {validateUser,comparePassword} = require("../Helpers/authorization/authHelpers");
const User = require("../Models/User");

const loginUser = asyncErrorWraper(async (req,res,next) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});
    
    if(!validateUser(user.email,email)){
        return next(new CustomError("Please Enter A Valid Email"),400);
    }

    

   if(!comparePassword(password,user.password)){

        return next(new CustomError("Please Check Your Credientals",400));
   }


    sendJwtToClient(user,res);
    
})

const logoutUser = asyncErrorWraper(async (req,res,next) => {

    const {NODE_ENV} = process.env;

    return res
    .status(200)
    .cookie({
        httpOnly : true,
        expires : new Date(Date.now()),
        secure : NODE_ENV === "development" ? false : true
    })
    .json({
        succes : true,
        message : "Logout Successfull"
    })
})

const registerUser = asyncErrorWraper(async (req,res,next) => {
    const info = req.body;

    const user = await User.create(info);

    sendJwtToClient(user,res);

    res
    .status(200)
    .json({
        success : true,
        data : user
    })


}) 

const resetPassword = asyncErrorWraper(async (req,res,next) => {
    const resetEmail = req.body.email;

    const user = await User.findOne({email : resetEmail});

    if(!user){
        return next(new CustomError("Email Couldnt Found",400));
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save();

    const resetPasswordUrl = `http://localhost:4000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
        <h3>RESET YOUR PASSWORD</h3>

        <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link will expire in 1 hour</a></p>
    
    `;

        try{
            await sendEmail({
                from : process.env.SMTP_USER,
                to : resetEmail,
                subject : "Reset Your Password",
                html : emailTemplate
            });
            return res
            .status(200)
            .json({
            succes : true,
            message : "Token Sent To Your Email"
        })
    }
    catch (err){
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new CustomError("Email Could Not Be Send",500));
    }
}) 

const imageUpload = asyncErrorWraper(async (req,res,next) => {
    //Image Upload Sccess

    const user = await User.findByIdAndUpdate(req.user.id,{
        "profile_image" : req.savedProfileImage
    },{
        new : true,
        runValidators : true
    })

    res
    .status(200)
    .json({
        succes : true,
        message : "Upload Success",
        data : user
    })
})



module.exports = {loginUser,logoutUser,registerUser,resetPassword,imageUpload};