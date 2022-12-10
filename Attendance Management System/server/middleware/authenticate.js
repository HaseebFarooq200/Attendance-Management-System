const jwt = require('jsonwebtoken')
const UsersData = require('../model/users')

const Authenticate = async (req,res,next)=>{
    try {
        const token = req.cookies.jwtoken        
        const verifytoken = jwt.verify(token,process.env.SECRETKEY)
        
        const currentUser = await UsersData.findOne({_id:verifytoken._id,'tokens.token':token})
        
        if(!currentUser){
            throw new Error('User Not Found')
        }
        else{
            req.token = token
            req.currentUser = currentUser
            req.userID = currentUser.userId
        }
    } catch (error) {
        res.status(401).send('Unauthorized: No Token Provided')
        console.log(error)
    }

    next();
}

module.exports = Authenticate