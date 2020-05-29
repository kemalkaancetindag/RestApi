const mongoose = require("mongoose");
const Discusion = require("./Discusion");
const User = require("./User");
const Schema = mongoose.Schema;


const IdeaSchema = new Schema({
    title : {
        type : String,
        required : true
        
    },
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    discusion : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    up_votes : [
        {
            type : mongoose.Types.ObjectId,
            
        }
    ],
    down_votes : [
        {
            type : mongoose.Types.ObjectId,
            
        }
    ],
    up_vote_count : {
        type : Number,
        
    },
    down_vote_count : {
        type : Number
        
    }

    
})



IdeaSchema.pre("save",async function(next){
    if(!this.isModified("user")){
         next();
     }
        const user = await User.findById(this.user._id);
        
    
        const discusion = await Discusion.findById(this.discusion._id);

        user.ideas.push(this._id);
        
        discusion.ideas.push(this._id);

        await user.save();
        await discusion.save();
        next();

    
    
        return next(err);
    
   
})

module.exports = mongoose.model("Idea",IdeaSchema)