var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '6M5X#D6%7Nh*!pkR3HL7F@Fdx';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30,'day').unix(),
    }

    return jwt.encode(payload,secret);
}
