var Post = require('../models/Post');
var Post_likes = require('../models/Post_likes');
var Post_comments = require('../models/Post_comments');
var User_friend = require('../models/User_friend');
var fs = require('fs');
var path = require('path');

const get_post_friends = async function(req,res){
    if (req.user) {
        let post = [];
        let data = [];
        let limit = req.params['limit']; //2
        let friends = await User_friend.find({user_origin:req.user.sub}).populate('user_friend');
        let my_user = await User_friend.findOne({user_friend: req.user.sub}).populate('user_friend');

        if(my_user != null) friends.push(my_user);

        for(var item of friends){
            console.log(item);
            if(item.user_friend){
                let posts = await Post.find({user:item.user_friend._id}).populate('user').sort({createdAt:-1});

                for(var subitem of posts){
                    let obj_like = await Post_likes.findOne({user:req.user.sub,post:subitem._id});
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
            }
        }

        let idx = 0; //0 - 1 -2
        for(var item of post){
           if(idx < limit) data.push(item)
           idx++;
        }

        res.status(200).send({data:data});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    get_post_friends
}


