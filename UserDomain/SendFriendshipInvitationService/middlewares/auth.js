const jwt = require('jsonwebtoken');

// El secreto usado para firmar el token (si API Gateway usa un autenticador JWT)
const secret = '6M5X#D6%7Nh*!pkR3HL7F@Fdx';

exports.auth = function(req, res, next) {
    // Acceder al payload del JWT validado por API Gateway
    const userData = req.headers['x-amzn-oidc-data']; // El payload del JWT viene aquí

    if (!userData) {
        return res.status(403).send({ message: 'Token no encontrado o inválido' });
    }

    // Decodificar el payload
    try {
        const user = JSON.parse(userData); // Asumiendo que es un objeto JSON

        console.log("🔍 Datos del usuario extraídos del JWT:", user);
        req.user = user;  // Guardar los datos del usuario en la solicitud

        next();  // Continuar con el procesamiento de la solicitud
    } catch (error) {
        console.log("❌ Error al procesar el token:", error);
        return res.status(403).send({ message: 'Error al procesar el token', error: error.message });
    }
};
