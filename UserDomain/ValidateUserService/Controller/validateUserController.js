const validate_user = async function(req,res){
    var data = req.body;

    var users = await User.find({email:data.email});

    if(users.length >= 1){

        let min = 1000;
        let max = 9999;

        let random = Math.floor(Math.random()*(max-min+1)+min);
        let user = await User.findByIdAndUpdate({_id:users[0]._id},{
            code_reset: random
        });

        email_code_reset(random,user.email);

        res.status(200).send({data:true});
    }else{
        res.status(200).send({data:false});
    }
}

module.exports = {
    validate_user
}