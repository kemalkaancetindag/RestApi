const asyncErrorWraper = require("express-async-handler");
const Discusion = require("../Models/Discusion");
const User = require("../Models/User");
const Idea = require("../Models/Idea");


const getAllIdeas = asyncErrorWraper(async (req,res,next) => {
    const {discusion_id} =req.params;

    const discusion = await Discusion.findById(discusion_id);

    const ideas = discusion.ideas;

    res
    .status(200)
    .json({
        success : true,
        data : ideas
    })
    
});

const getSingleIdea = asyncErrorWraper(async (req,res,next) => {
    const {id} = req.params;
    const idea = await Idea.findById(id);
    
  

    res
    .status(200)
    .json({
        success : true,
        data : idea
        
    })



    
    

});

const editIdea = asyncErrorWraper(async (req,res,next) => {
    const {id} = req.params;
    const {content,title} = req.body;
    const idea = await Idea.findById(id);

    idea.content = content;
    idea.title = title;

    await idea.save();

    res
    .status(200)
    .json({
        success : true,
        data : idea
    })

});

const deleteIdea = asyncErrorWraper(async (req,res,next) => {
    const {id} = req.params;
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    const index_user = user.ideas.indexOf(id);
    

    //TODO: Arrayden Koparmayı Modellere Taşı
    user.ideas.splice(index_user,1);
    

    await Idea.findByIdAndRemove(id);

    user.idea_count = user.ideas.length();

    await user.save();

    res
    .status(200)
    .json({
        success : true,
        message : "Delete Succes"
    })
});

const addNewIdea = asyncErrorWraper(async (req,res,next) => {
    const {content,title} = req.body;
    const {discusion_id} = req.params;
    
    const user = req.user.id;

    


    const idea = await Idea.create({
        content : content,
        title : title,
        user : user,
        discusion : discusion_id
    })
    user.idea_count = user.ideas.length();

    await user.save();

    res
    .status(200)
    .json({
        success : true,
        data : idea
        
    })
});

const upVoteIdea = asyncErrorWraper(async (req,res,next) => {
    const {id} = req.params;
    const user_id = req.user.id;

    const idea = Idea.findById(id);

    idea.up_votes.push(user_id);

    idea.up_vote_count = idea.up_votes.length();
    await idea.save();

    res
    .status(200)
    .json({
        success : true,
        data : idea
    })
})

const downVoteIdea = asyncErrorWraper(async (req,res,next) => {
    const {id} = req.params;
    const user_id = req.user.id;

    const idea = Idea.findById(id);

    idea.down_votes.push(user_id);

    idea.down_vote_count = idea.down_votes.length();
    await idea.save();

    res
    .status(200)
    .json({
        success : true,
        data : idea
    })
})



module.exports = {getAllIdeas,getSingleIdea,editIdea,deleteIdea,addNewIdea,upVoteIdea,downVoteIdea};