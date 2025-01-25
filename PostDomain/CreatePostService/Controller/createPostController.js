var Post = require('../models/Post');
var Post_likes = require('../models/Post_likes');
var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
var User = require('../models/User');
const Notification = require('../models/Notification');
var fs = require('fs');
var path = require('path');


const create_post = async function(req,res){
    if (req.user) {
       try {
            let data = req.body;

            if(data.tipo == 'Media'){
                let img_path = req.files.media.path.split('\\')[2];
                data.media = img_path;
            }

            data.user = req.user.sub;
            let post = await Post.create(data);

            //Notificacion
            let friends = await User_friend.find({user_origin:req.user.sub}).populate('user_friend');

            for(var item of friends){
                let description = req.user.names.split(' ')[0] + ' ' + req.user.surnames.split(' ')[0] + ' a creado una nueva publicación';

                await Notification.create({
                    type: 'Publicaciones',
                    description,
                    user_interaction: req.user.sub,
                    user: item.user_friend._id,
                    post: post._id
                });
            }

            res.status(200).send({data:post,friends});
       } catch (error) {
            console.log(error);
            res.status(200).send({data:undefined,message:'No se pudo crear la publicación.'});
       }

    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    create_post
}