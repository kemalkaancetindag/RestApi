const mongoose = require("mongoose");
const User = require("./User");
const Idea = require("./Idea");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const DiscusionSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    about : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now()
    },
    content : {
        type : String,
        required : true
    },
    ideas : [
        {
            type : mongoose.Types.ObjectId,
            
        }
    ],
    user : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    up_votes : [
        {
            type : mongoose.Types.ObjectId
            
            
        }
    ],
    down_votes : [
        {
            type : mongoose.Types.ObjectId
            
        }
    ],
    up_vote_count : {
        type : Number
        
    },
    down_vote_count : {
        type : Number
        
    },
    slug : {
        type : String
    }
})

DiscusionSchema.pre("save",async function(next){
    const user = await User.findById(this.user._id);

    user.discusions.push(this._id);

    await user.save();

    next();

    return next(err);
})

DiscusionSchema.post("remove",async function(next){
    await Idea.deleteMany({
        discusion : this._id
    })

    
})

DiscusionSchema.pre("save",function(next){
    if(!this.isModified("title")){
        next();
    }
    this.slug = this.makeSlug();
    next();
});

DiscusionSchema.methods.makeSlug = function(){
    return slugify(this.title, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@]/g, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
       
      })
}

module.exports = mongoose.model("Discusion",DiscusionSchema);