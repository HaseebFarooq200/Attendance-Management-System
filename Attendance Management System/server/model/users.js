const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    countPresent:{
        type: Number,
        default:0,
        required:true
    },
    countAbsent:{
        type: Number,
        default:0,
        required:true
    },
    countLeave:{
        type: Number,
        default:0,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]


})


// Generating a TOKEN
userSchema.methods.generateAuthToken = async function (){
    try {
        let gen_token = jwt.sign({_id:this._id}, process.env.SECRETKEY)
        this.tokens = this.tokens.concat({token:gen_token})
        await this.save();
        return gen_token;
    } catch (error) {
        console.log(error)
    }
} 
const Users = mongoose.model('User', userSchema)

module.exports = Users



