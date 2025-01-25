const validate_code = async function(req,res){
    let code = req.params['code'];
    let email = req.params['email'];

    let user = await User.findOne({email:email});

    if(code == user.code_reset){
        res.status(200).send({data:true});
    }else{
        res.status(200).send({data:false});
    }

}


module.exports = {
    validate_code
}