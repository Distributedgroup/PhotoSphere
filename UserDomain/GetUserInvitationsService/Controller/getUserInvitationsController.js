const get_user_invitation = async function(req,res){
    if (req.user) {
        let type = req.params['type'];
        if(type == 'Limit'){
            let invitations = await User_invitation.find({recipient_user:req.user.sub}).populate('user_origin').limit(5).sort({createdAt:-1});
            res.status(200).send({data:invitations});
        }else if(type == 'Complet'){
            let invitations = await User_invitation.find({recipient_user:req.user.sub}).populate('user_origin').sort({createdAt:-1});
            res.status(200).send({data:invitations});
        }
        
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    get_user_invitation
}