const reset_password = async function(req,res){
    var email = req.params['email'];
    var data = req.body;

    var user = await User.findOne({email:email});

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(data.password_new, salt, async function(err, hash) {
            await User.findByIdAndUpdate({_id:user._id},{
                password: hash
            });
            res.status(200).send({data:usuario});
        });
    });
}

module.exports = {
    reset_password
}