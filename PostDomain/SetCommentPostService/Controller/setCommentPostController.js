var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
const Notification = require('../models/Notification');
var fs = require('fs');
var path = require('path');


const set_comment_post = async function(req,res){
    if (req.user) {
        let data = req.body;
        
        data.user = req.user.sub;
        let comment = await Post_comments.create(data);

        //Notificacion
        let friends = await User_friend.find({user_origin:req.user.sub}).populate('user_friend');

        for(var item of friends){
            let description = req.user.names.split(' ')[0] + ' ' + req.user.surnames.split(' ')[0] + ' a comentado una publicación.';

            await Notification.create({
                type: 'Comentarios',
                description,
                user_interaction: req.user.sub,
                user: item.user_friend._id, //
                post: data.post
            });
        }

        //Diego a creado una publicacion

        //vincent => Diego a creado una nueva publicacion
        
        res.status(200).send({data:comment,friends});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    set_comment_post
};
