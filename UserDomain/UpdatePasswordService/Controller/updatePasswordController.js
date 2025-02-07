var Usuario = require('../Model/User'); 
const bcrypt = require('bcrypt'); // Add bcrypt import

const saltRounds = 10; // Define saltRounds before using it

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
                    res.status(200).send({data:undefined,message: 'The current password is incorrect'});
                }
            }else{
                res.status(200).send({data:undefined,message: 'A problem occurred'});
            }
        });

    } else {
        res.status(403).send({message: 'NoAccess'}); 
    }
}

module.exports = {
    update_password
}
