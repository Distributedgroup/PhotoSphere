const Notification = require('../Model/Notification');
var fs = require('fs');
var path = require('path');

const get_notifications = async function(req,res){
    if (req.user) {

        let notifications = await Notification.find({user:req.user.sub, state: false}).limit(10).sort({createdAt:-1}).populate('user_interaction');
        res.status(200).send({data:notifications});

    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    get_notifications
};
