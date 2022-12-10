const express = require('express')
const router = express.Router()
const cookieParser = require("cookie-parser");
const UsersData = require('../model/users')
const UsersAttendance = require('../model/attendance')
const UsersLeave = require('../model/leave')
const authenticate = require('../middleware/authenticate')
require('jsonwebtoken')
router.use(cookieParser())

router.post('/register', async (req, res) => {
    const { userId, userName, password, confirmpassword, designation } = req.body

    if (!userId || !userName || !designation || !password || !confirmpassword) {
        console.log("Incomplete Form")
        return res.status(422).json({ error: 'Incomplete Form' })
    }
    if (password != confirmpassword) {
        console.log("Passwords dont match")
        return res.status(422).json({ error: 'Passwords dont match' })
    }
    try {
        const UserExist = await UsersData.findOne({ userId })
        if (UserExist) {
            res.status(422).json({ error: 'User already Exist' })
            console.log("User already Exist")
        }
        else {
            const newuser = new UsersData({ userId, userName, designation, password, confirmpassword })
            await newuser.save()
            res.status(200).json({ message: 'Registered Successfully' })
            console.log("Registered Successfully", newuser)
        }
    } catch (error) {
        console.log(error)
    }
})
router.post('/signin', async (req, res) => {
    const { userId, password } = req.body
    if (!userId || !password) {
        console.log("Incomplete Entries")
        return res.status(422).json({ error: 'Incomplete Entries' })
    }
    try {
        const UserLogin = await UsersData.findOne({ userId })
        if (UserLogin) {
            const token = await UserLogin.generateAuthToken()
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            if (password != UserLogin.password) {
                res.status(422).json({ error: "Invalid Password" });
            }
            else {
                    res.status(200).json({ message: "User successfully loggged in User Page" });
            }
        }
        else {
            res.status(422).json({ message: 'Invalid User' })
            console.log("Invalid User")
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/userattendance', async (req, res) => {
    const { userId, userName, attendanceStatus} = req.body
    if(attendanceStatus==='Present'){
        UsersData.updateOne(
            {userId : userId},
            {$inc: { countPresent : 1}},()=>{
            });
    }
    else if(attendanceStatus==='Absent'){
        UsersData.updateOne(
            {userId : userId},
            {$inc: { countAbsent : 1}},()=>{
            });
    }
    else if(attendanceStatus==="Leave"){
        UsersData.updateOne(
            {userId : userId},
            {$inc: { countLeave : 1}},()=>{
            });
    }
    try {
        const saveattendance = new UsersAttendance({ userId, userName, attendanceStatus, Date: new Date().toLocaleDateString() })
        await saveattendance.save()
        res.status(200).json({ message: "Attendance saved Successfully" })
        console.log("Attendance saved Successfully")

    } catch (error) {
        console.log(error)
    }
})

router.post('/applyleave', async (req, res) => {
    const { userId, userName, leaveSubject, leaveDate, leaveDescription } = req.body
    if (!leaveSubject || !leaveDate || !leaveDescription) {
        console.log("Incomplete Entries")
        return res.status(422).json({ error: 'Incomplete Entries' })
    }
    try {
        const saveleave = new UsersLeave({ userId, userName, leaveSubject, leaveDate, leaveDescription, currentDate: new Date().toLocaleDateString() })
        await saveleave.save()
        res.status(200).json({ message: "Leave Successfully Applied" })
        console.log("Leave Successfully Applied")

    } catch (error) {
        console.log(error)
    }
})

router.get('/userpanel', authenticate, async (req, res) => {
    res.send(req.currentUser)
})

router.get('/usersdata', async (req, res) => {
    try {
        const usersdata = await UsersData.find({isAdmin:false})
        res.status(200).json(usersdata)
    } catch (error) {
        console.log(error)
    }
})
router.get('/usersleave', async (req, res) => {
    try {
        const usersleave = await UsersLeave.find()
        res.status(200).json(usersleave)
    } catch (error) {
        console.log(error)
    }
})
router.get('/attendancerecord', async (req, res) => {
    try {
        const attendancerecord = await UsersAttendance.find()
        res.status(200).json(attendancerecord)
    } catch (error) {
        console.log(error)
    }
})

router.get('/logout', (req,res) =>{
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('User Logout Successfully')
})

module.exports = router
