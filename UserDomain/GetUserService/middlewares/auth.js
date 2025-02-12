var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '6M5X#D6%7Nh*!pkR3HL7F@Fdx';

exports.auth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');
    console.log("Token recibido:", token);  // 🔍 Imprime el token en los logs

    var segments = token.split('.');
    if (segments.length !== 3) {
        return res.status(403).send({ message: 'InvalidToken' });
    }

    try {
        var payload = jwt.decode(token, secret);
        console.log("Payload decodificado:", payload);  // Verify content of token

        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ message: 'TokenExpirado' });
        }
    } catch (error) {
        console.log("Error al decodificar el token:", error);  // 🔍 Muestra el error exacto
        return res.status(403).send({ message: 'ErrorToken', error: error.message });
    }

    req.user = payload;
    next();
};
