const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth= async(req,res,next)=>{
    try{
        const token= req.header('Authorization').replace('Bearer ','')
        console.log(token)

        // check token valid
        const decode = jwt.verify(token,'node course')
        // get user who is carring valid token
        const user = await User.findOne({_id:decode._id,'tokens.token':token})
        console.log(user)
        
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        // console.log("kkkkk")
        next()
    }
    catch(e){
        res.status(401).send({error:'please authentication'})
    }
}


module.exports = auth
