var Post = require('../models/Post');
var Post_likes = require('../models/Post_likes');
var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
var User = require('../models/User');
const Notification = require('../models/Notification');
var fs = require('fs');
var path = require('path');


const set_like_post = async function(req,res){
    if (req.user) {

        let data = req.body;
        let state = '';
        let obj_like = await Post_likes.find({user:req.user.sub,post:data.post});
        
        if(obj_like.length >= 1){
            //se emitio un like
            state = 'Eliminacion';
            await Post_likes.findByIdAndRemove({_id:obj_like[0]._id})
        }else if(obj_like.length == 0){
            //no se emitio ningun like
            state = 'Creación';
            await Post_likes.create({
                post: data.post,
                user: req.user.sub
            });
        }
        
        res.status(200).send({data:state});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    set_like_post 
};
