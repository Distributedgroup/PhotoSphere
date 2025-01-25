const update_user = async function(req,res){
    if (req.user) {
        var id = req.params['id'];
        var data = req.body;

        console.log(data);

        var user = await User.findByIdAndUpdate({_id:id},{
            names: data.names,
            surnames: data.surnames,
            genrer: data.genrer,
            birth: data.birth,
            profession: data.profession,
            telephone: data.telephone,
            description: data.description
        });

        res.status(200).send({data:user});
    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}


module.exports = {
    update_user
}