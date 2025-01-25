var Post = require('../models/Post');
var Post_likes = require('../models/Post_likes');
var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
var User = require('../models/User');
const Notification = require('../models/Notification');
var fs = require('fs');
var path = require('path');
const axios = require('axios');
const Storie = require('../models/Storie'); // Modelo de historias

const get_post = async function(req,res){
    if (req.user) {
        let id = req.params['id'];

        let post = {};
        let reg_post = await Post.findById({_id:id}).populate('user');

        let obj_like = await Post_likes.findOne({user:req.user.sub,post:reg_post._id});
        let reg_likes = await Post_likes.find({post:reg_post._id});

        let comments = await Post_comments.find({post:reg_post._id,type:'Comentario'}).populate('user');

        let arr_comments = [];
        for(var replay of comments){
            let answers = await Post_comments.find({reply_id:replay._id,type:'Respuesta'}).populate('user');

            arr_comments.push({
                comment: replay,
                answers : answers 
            });
        }

        post = {
            post: reg_post,
            like: obj_like,
            likes: reg_likes,
            comments: arr_comments,
        }

        res.status(200).send({data:post});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    get_post
};
