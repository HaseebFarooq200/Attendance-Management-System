const mongoose = require('mongoose')

const leaveSchema =new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    leaveSubject:{
        type: String,
        required:true
    },
    leaveDate:{
        type: String,
        required:true
    },
    leaveDescription:{
        type: String,
        required:true
    },
    currentDate:{
        type: String,
        required:true
    }

})

const Leave = mongoose.model('Leave', leaveSchema)

module.exports = Leave