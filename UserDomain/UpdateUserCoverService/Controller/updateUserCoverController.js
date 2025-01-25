const update_user_cover = async function(req,res){
    if (req.user) {
        
        var img = req.files.cover.path.split('\\')[2];
        var user = await User.findByIdAndUpdate({_id:req.user.sub},{
            portada: img,
        })

        res.status(200).send({data:usuario});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    update_user_cover
}