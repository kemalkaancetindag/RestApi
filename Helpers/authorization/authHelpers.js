const asyncErrorWraper = require("express-async-handler");
const bcrypt = require("bcrypt");




const validateUser = asyncErrorWraper(async (email,user_email) => {
   
    if(email == user_email){
        return true
    }
    else{
        return false
    }

})

const comparePassword = asyncErrorWraper((password,userpass) => {
    bcrypt.compareSync(password, userpass);
})  


module.exports = {comparePassword,validateUser};