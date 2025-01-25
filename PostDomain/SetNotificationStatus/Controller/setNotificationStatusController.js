var Post = require('../models/Post');
var Post_likes = require('../models/Post_likes');
var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
var User = require('../models/User');
const Notification = require('../models/Notification');
var fs = require('fs');
var path = require('path');

const set_notification_status = async function(req,res){
    if (req.user) {

        let id = req.params['id'];

        let notification = await Notification.findByIdAndUpdate({_id:id},{
            state: true
        })

        res.status(200).send({data:notification});

    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    set_notification_status 
};
