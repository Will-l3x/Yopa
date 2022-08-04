const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/Auth')
// @desc Register new Auth
// @route POST /api/Auths
// @access Public
const registerAuth = asyncHandler (async (req, res) => {
    const { username, fullname, email, password, dateofbirth, interest, city, phonenumber } = req.body

    if(!username || !email || !password || !dateofbirth || !interest || !city || !phonenumber || !fullname) {
        res.status(400)
        throw new Error('Please enter all fields')
        
    }
    // Check if Auth exists
    const AuthExists = await User.findOne({ email })

    if(AuthExists){
        res.status(400).json({
            message: 'email already exists'
        })
        
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create Auth
    const Auth = await User.create({
        fullname,
        email,
        username,
        dateofbirth,
        password: hashedPassword,
        phonenumber,
        interest,
        city

    })

    if(Auth){
        res.status(201).json({
            _id: Auth.id,
            fullname: Auth.fullname,
            email: Auth.email,
            username: Auth.username,
            dateofbirth: Auth.dateofbirth,
            phonenumber: Auth.phonenumber,
            interest: Auth.interest,
            city: Auth.city,
            token: generateToken(Auth._id),
            message: 'Register User'
        })
    } else {
        res.status(400).json({
            message: 'Something went wrong contact admin'
        })
        throw new Error('User not created')
    }
    
    
})

// @desc Authenticate a Auth
// @route POST /api/login
// @access Public
const loginAuth = asyncHandler (async (req, res) => {
    const { email, password } = req.body

    // Check if Auth exists
    const Auth = await User.findOne({ email })

    if(Auth && (await bcrypt.compare(password, Auth.password))){
        res.json({
            _id: Auth.id,
            fullname: Auth.fullname,
            email: Auth.email,
            token: generateToken(Auth._id),
            message: 'Login Successfull'
        })
    }else{
        res.status(400).json({
            message: 'Invalid Credentials'
        })
        throw new Error('Invalid credentials')
    }
   
})

// @desc Get Auth data
// @route GET /api/Auths/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

//Generate token  
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerAuth, loginAuth, getMe
}