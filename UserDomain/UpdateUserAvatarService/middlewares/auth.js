var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '6M5X#D6%7Nh*!pkR3HL7F@Fdx';

exports.auth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    
    console.log("Token recibido:", token);

    if (!token.startsWith("Bearer ")) {
        return res.status(403).send({ message: 'InvalidTokenFormat' });
    }

    token = token.replace("Bearer ", ""); // Delete "Bearer "

    var segments = token.split('.');
    
    if (segments.length !== 3) {
        return res.status(403).send({ message: 'InvalidToken' });
    }

    try {
        var payload = jwt.decode(token, secret);

        if (!payload || !payload.exp) {
            return res.status(403).send({ message: 'MalformedToken' });
        }

        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ message: 'TokenExpired' });
        }

        req.user = payload;
        next();
    } catch (error) {
        console.log("Error decoding token:", error);
        return res.status(403).send({ message: 'ErrorToken' });
    }
};
