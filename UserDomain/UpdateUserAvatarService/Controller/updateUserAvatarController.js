const User = require('../Model/user');  

const update_user_avatar = async function(req,res){
    if (req.user) {
        
        var img = req.files.avatar.path.split('\\')[2];
        var user = await User.findByIdAndUpdate({_id:req.user.sub},{
            avatar: img,
        });

        res.status(200).send({data:user});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    update_user_avatar
};
