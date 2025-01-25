const get_users = async function(req,res){
    if (req.user) {
        let filter = req.params['filter'];
        
        var users = await User.find({
            $or: [
                {names: new RegExp(filter,'i')},
                {surnames: new RegExp(filter,'i')}
            ],_id:{$ne:req.user.sub}
        });


        res.status(200).send({data:users});

    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    get_users
}