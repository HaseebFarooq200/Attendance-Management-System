const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    attendanceStatus:{
        type: String,
        required:true
    },  
    Date:{
        type: String,
        required:true
    }
})

const Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = Attendance