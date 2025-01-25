const get_user_username = async function(req,res){
    if (req.user) {
        let username = req.params['username'];

        var users = await User.find({username:username});
       

        if(users.length >= 1){
            var friends = await User_friend.find({user_origin:users[0]._id});
            res.status(200).send({data:users[0],n_friends:friends.length});
        }else{
            res.status(200).send({data:undefined});
        }

        
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    get_user_username
}