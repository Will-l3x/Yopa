const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const validator = require('validator');


    
const NotificationsScheme = mongoose.Schema({
    notificationname: {
        type: String,
        required: [true, 'Please a name for the notificatio'],
    },
    link: {
        type: String,
        required: [true, 'Please add your web link']
    },
    promotion: {
        type: String,
        required: [true, 'Please add supporting text'],
        
    },

    not_id:{
        type: String,
        required: [true, 'please add an id for your notification']
    }
    
    
     
    
},
{
    timestamps: true
})


module.exports = mongoose.model('notificatios', NotificationsScheme);