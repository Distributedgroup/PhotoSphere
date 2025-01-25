
const update_password = async function(req,res){
    if (req.user) {
        var id = req.params['id'];
        var data = req.body;

        var user = await User.findById({_id:id});

        bcrypt.compare(data.password_actual, user.password, function(err, result) {
            if(!err){
                if(result){
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(data.new_password, salt, async function(err, hash) {
                            await User.findByIdAndUpdate({_id:id},{
                                password: hash
                            });
                            res.status(200).send({data:user});
                        });
                    });
                }else{
                    res.status(200).send({data:undefined,message: 'La contraseña actual es incorrecta'});
                }
            }else{
                res.status(200).send({data:undefined,message: 'Ocurrió un problema'});
            }
        });

    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    update_password
}