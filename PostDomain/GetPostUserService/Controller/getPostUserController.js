var Post = require('../models/Post');
var Post_likes = require('../models/Post_likes');
var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
var User = require('../models/User');
const Notification = require('../models/Notification');
var fs = require('fs');
var path = require('path');


const get_post_user = async function(req,res){
    if (req.user) {

        try {
            let username = req.params['username'];

            let user = await User.findOne({username:username});

            if(user){
                let posts = await Post.find({user:user._id}).populate('user').sort({createdAt:-1});
                let post = [];

                for(var subitem of posts){
                    let obj_like = await Post_likes.findOne({user:user._id,post:subitem._id});
                    let reg_likes = await Post_likes.find({post:subitem._id});

                    let comments = await Post_comments.find({post:subitem._id,type:'Comentario'}).populate('user');

                    let arr_comments = [];
                    for(var replay of comments){
                        let answers = await Post_comments.find({reply_id:replay._id,type:'Respuesta'}).populate('user');

                        arr_comments.push({
                            comment: replay,
                            answers: answers
                        });
                    }

                    post.push({
                        post: subitem,
                        like: obj_like,
                        likes: reg_likes,
                        comments: arr_comments,
                    });
                }

                res.status(200).send({data:post});
            }else{
                res.status(200).send({data:undefined});
            }
        } catch (error) {
            res.status(200).send({data:undefined});
        }
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    get_post_user
};
