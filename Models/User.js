const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        required : [true,"Please Enter Your Name"]
    },
    password : {
        type : String,
        required : [true,"Please Enter Your Password"]
    },
    email : {
        type : String,
        unique : [true,"That Email Already Used"],
        required : [true,"Please Enter Your Email"]
    },
    info : {
        type : String
    },
    profile_image : {
        type : String,
        default : "default.jpg"
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        required : true
    },
    discusions : [
        {
            type : mongoose.Types.ObjectId
        }
    ],
    ideas : [
        {
            type : mongoose.Types.ObjectId
        }
    ],
    user_votes : [
        {
            type : mongoose.Types.ObjectId
        }
    ],
    discusion_count : {
        type : Number
    },
    user_vote_count : {
        type : Number
    },
    idea_count : {
        type : Number
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpire : {
        type : Date
    }

    

})

UserSchema.methods.getResetPasswordTokenFromUser = function(){
    const randomHexByte = crypto.randomBytes(15).toString("hex");

    const {RESET_PASSWORD_EXPIRE} = process.env;

    const resetPasswordToken = crypto.createHash("SHA256").update(randomHexByte).digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;


}


UserSchema.methods.generateJwtFromUser = function(){

    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;



    const payload = {
        id : this._id,
        name : this.name
    };

    const token = jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn : JWT_EXPIRE
    });

    return token;

};

UserSchema.pre("save",function(next){
    var user = this;

    if(!user.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            next(err);
        } 
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err){
                next(err);
            }
            this.password = hash;
            next();
        });
    });

    

})

module.exports =  mongoose.model("User",UserSchema);

