const accept_deny_invitation = async function(req,res){
    if (req.user) {
        let type = req.params['type'];//Denegar Aprobar 
        let id = req.params['id'];

        if(type === 'Denegar'){
            //ELIMINAR LA INVITACION
            await User_invitation.findOneAndRemove({_id:id});
            res.status(200).send({data:true});
        }else if(type === 'Aprobar'){
            //OBTENER LA INFORMACION DE LA INVITACIÓN
            let invitation = await User_invitation.findById({_id:id});

            //CREAR LA RELACION DE AMIGO
            await User_friend.create({
                user_origin: req.user.sub, //Fernando YO
                user_friend: invitation.user_origin //Jorge
            });
            
            await User_friend.create({
                user_origin: invitacion.usuario_origen, //Jorge
                user_friend:  req.user.sub//Fernando YO
            });

            //ELIMINAR LA INVITACIÓN
            await User_invitation.findOneAndRemove({_id:id});
            res.status(200).send({data:true});
        }
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    accept_deny_invitation
}