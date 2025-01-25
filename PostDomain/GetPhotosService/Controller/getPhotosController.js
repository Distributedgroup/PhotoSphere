var Post = require('../models/Post');
var Post_likes = require('../models/Post_likes');
var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
var User = require('../models/User');
const Notification = require('../models/Notification');
var fs = require('fs');
var path = require('path');

const get_photos = async function(req,res){
    if (req.user) {

        let username = req.params['username'];

        let user = await User.findOne({username:username});
        console.log(user);
        if(user){
            let posts = await Post.find({user:user._id,tipo:'Media'}).sort({createdAt:-1});
            res.status(200).send({data:posts});
        }else{
            res.status(200).send({data:undefined});
        } 
        
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    get_photos
};
