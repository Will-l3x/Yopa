const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/Auth')
// @desc Register new Auth
// @route POST /api/Auths
// @access Public
const registerAuth = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all fields')
        
    }
    // Check if Auth exists
    const AuthExists = await User.findOne({ email })

    if(AuthExists){
        res.status(400)
        throw new Error('User already exists')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create Auth
    const Auth = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(Auth){
        res.status(201).json({
            _id: Auth.id,
            name: Auth.name,
            email: Auth.email,
            token: generateToken(Auth._id),
            message: 'Register User'
        })
    } else {
        res.status(400)
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
            name: Auth.name,
            email: Auth.email,
            token: generateToken(Auth._id),
            message: 'Login User'
        })
    }else{
        res.status(400)
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