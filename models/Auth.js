const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const validator = require('validator');


    
const AuthentificationScheme = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
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