const Notifications = require('../models/Notifications')

exports.addNotificaion = async (req, res, next)=>{
    try{
        const { notificationname, link,promotion, not_id} = req.body;

        const accounts = await Notifications.create(req.body);

             return res.status(201).json({
                success: true,
                data: accounts
            })
    }catch (err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages,
            })
        }else{
            return res.status(500).json({
                success: false,
                error: 'server error'
            }) 
        }
    }
}

exports.getNotificaions = async (req, res, next)=>{
    try{
        const {not_id} = req.body
        
        Notifications.find({not_id: not_id }, (err, account)=>{
            if (!account){
                return res.status(404).json({
                    success: false,
                    error: 'notification id not found in database'
                })
            }else {
                return res.status(200).json({ 
                    success: true,
                    count: account.length,
                    data: account
                })
            }
        });

        
    }catch (err){
        return res.status(500).json({
            success: false,
            error: 'server error contact admin'
        })
        
    }
}