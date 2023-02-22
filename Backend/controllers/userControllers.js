import User from '../models/userModel.js'
import AsyncHandler from "express-async-handler"
import generateToken from '../utils/generateToken.js'


/*********************************************
 * @desc Register user
 * @route POST /api/users/register
 * @access Public
 ********************************************/
 const registerUser = AsyncHandler(async(req,res) =>{
    const { name, email, password }=req.body

    const userExists = await User.findOne({email:email})

    if(userExists){
        res.status(401)
        throw new Error("User already registerd!")

    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid User data")
    }
})


/*********************************************
 * @desc Auth User & get token
 * @route POST /api/users/login
 * @access Public
 ********************************************/
const authUser = AsyncHandler(async(req,res) =>{
    const { email, password }=req.body

    const user = await User.findOne({email:email})

    if(user && (await user.matchPassword(password))){
        //matching the passwrord
        res.json({
            _id:user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error("Invalid email 0r password")
    }
    res.send({
        email,
        password
    })
})

/*********************************************
 * @desc Get User profile
 * @route GET /api/users/profile
 * @access Private
 ********************************************/
 const getUserProfile = AsyncHandler(async(req,res) =>{
    // res.send("Success")
    const user = await User.findById(req.user._id)
    console.log("user :",user)
    if (user) {
        console.log("user presnt")
        return res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
    }
     else {
      res.status(404)
      throw new Error('User not found')
    } 
})

/*********************************************
 * @desc Update User profile
 * @route PUT /api/users/profile
 * @access Private
 ********************************************/
 const updateUserProfile = AsyncHandler(async(req,res) =>{
    // res.send("Success")
    const user = await User.findById(req.user._id)
    console.log("user :",user)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        return res.json(
            {
                _id:user._id,
                name: user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                token:generateToken(user._id)
                
            })
            }
     else {
      res.status(404)
      throw new Error('User not found')
    } 
})

export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile
}