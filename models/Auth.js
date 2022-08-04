const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const validator = require('validator');


    
const AuthentificationScheme = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please select a username'],
    },
    fullname: {
        type: String,
        required: [true, 'Please add your fullname']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    dateofbirth: {
        type: String,
        required: [true, 'Please add your date of birth']
    },
    city:{
        type: String,
        required: [true, 'Please add your city']
    },
    phonenumber:{
        type: String,
        required: [true, 'Please add your phone number']
    },
    interest:{
        type: String,
        required: [true, 'Please pick at least one interest']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        
    }
},
{
    timestamps: true
})


module.exports = mongoose.model('Auth', AuthentificationScheme);