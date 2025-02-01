const User = require('../Model/user');  
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');  

const login_user = async function(req,res){
    console.log(req.body);
    let data = req.body;

    let user = await User.find({email:data.email});

    if(user.length >= 1){
        //email exist
        bcrypt.compare(data.password, user[0].password, function(err, result) {
            // result == true
            if(!err){
                //
                if(result){
                    res.status(200).send({
                        data:user[0],
                        token: jwt.createToken(user[0])
                    });
                }else{
                    res.status(200).send({data:undefined,message: 'The password is incorrect'});
                }
            }else{
                res.status(200).send({data:undefined,message: 'A problem occurred'});
            }
        });
    }else{
        res.status(200).send({data:undefined,message: 'Email does not exist'});
    }
}

module.exports = {
    login_user
}
