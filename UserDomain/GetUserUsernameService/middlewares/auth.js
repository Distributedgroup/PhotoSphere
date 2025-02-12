var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '6MSX#D67N*pkR3HL7F@fdx';

exports.auth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    try {
        let token = req.headers.authorization.replace("Bearer ", "").trim();
        let payload = jwt.decode(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ message: 'TokenExpirado' });
        }

        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).send({ message: 'ErrorToken' });
    }
};
