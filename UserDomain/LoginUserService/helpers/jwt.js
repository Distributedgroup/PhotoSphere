var jwt = require('jsonwebtoken');
var moment = require('moment');

var secret = '6M5X#D6%7Nh*!pkR3HL7F@Fdx';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        names: user.names || "SinNombre",
        surnames: user.surnames || "SinApellido",
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.sign(payload, secret);
};
