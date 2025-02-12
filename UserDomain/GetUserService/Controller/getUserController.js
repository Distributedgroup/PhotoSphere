const get_user = async function(req,res){
    if(req.user){
        var id = req.params['id'];

        var user = await User.findById({_id:id});
        res.status(200).send({data:usuario});
    }else{
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    get_user
}