var Post = require('../models/Post');
var Post_likes = require('../models/Post_likes');
var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
var User = require('../models/User');
const Notification = require('../models/Notification');
var fs = require('fs');
var path = require('path');


const get_post_img = async function(req,res){
    var img = req.params['img'];
    fs.stat('./uploads/posts/'+img, function(err){
        if(err){
            res.status(200).send({message:'No se encontró la imagen'});
        }else{
            let path_img = './uploads/posts/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

module.exports = {
    get_post_img
};
