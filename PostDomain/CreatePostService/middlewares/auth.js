var jwt = require('jsonwebtoken'); // Usa jsonwebtoken en lugar de jwt-simple
var moment = require('moment');
var secret = '6M5X#D6%7Nh*!pkR3HL7F@Fdx';  // Debes usar la misma clave secreta

exports.auth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    var token = req.headers.authorization.split(" ")[1]; // Quitar "Bearer"
    console.log("🔍 Token recibido:", token);

    try {
        var payload = jwt.verify(token, secret); // Verificar la firma del token
        console.log("✅ Token decodificado correctamente:", payload);

        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ message: 'TokenExpirado' });
        }

        req.user = payload; // Guardar el usuario en la petición
        next();
    } catch (error) {
        console.log("❌ Error al decodificar el token:", error);
        return res.status(403).send({ message: 'ErrorToken', error: error.message });
    }
};
