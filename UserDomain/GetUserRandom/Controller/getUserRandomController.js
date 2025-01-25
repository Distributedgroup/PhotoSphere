const get_user_random = async function(req,res){
    if (req.user) {
        let data = [];
        let users = await User.find({_id:{$ne:req.user.sub}});
        let invitations_sent = await User_invitation.find({user_origin:req.user.sub});
        let invitations_received = await User_invitation.find({recipient_user:req.user.sub});
        let users_friends = await User_friend.find({user_origin:req.user.sub});
        let count = 0;
        for(var item of users){
            //QUITAR USUARIOS A QUIENES SE ENVIA UNA INVITACIÓN
            let reg_sents = invitations_sents.filter(subitem=> subitem.recipient_user.toString() == item._id.toString());

            let reg_receiveds = invitations_receiveds.filter(subitem=> subitem.user_origin.toString() == item._id.toString());

            let friends = users_friends.filter(subitem=> subitem.user_friend.toString() == item._id.toString());

            if(count <= 5){
                if(reg_sents.length == 0){
                    if(reg_sents.length == 0){
                        if(friends.length == 0){
                            count++;
                            data.push(item);
                        }
                    }
                }
            }
        }
        res.status(200).send({data:data});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    get_user_random
}