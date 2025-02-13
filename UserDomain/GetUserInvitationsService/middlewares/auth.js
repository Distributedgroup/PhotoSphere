const jwt = require('jsonwebtoken');

// El secreto usado para firmar el token (si API Gateway usa un autenticador JWT)
const secret = '6M5X#D6%7Nh*!pkR3HL7F@Fdx';

exports.auth = function(req, res, next) {
    console.log("🔍 Headers de la solicitud:", req.headers);  // Verifica que los headers lleguen correctamente

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'NoHeadersError' });
    }

    const token = req.headers.authorization.split(" ")[1];  // Extrae el token
    console.log("🔍 Token recibed:", token);  // Verifica el token recibido

    try {
        const payload = jwt.verify(token, secret);  // Verificar la firma del token

        console.log("✅ Token decodificado correctamente:", payload);
        req.user = payload;
        next();
    } catch (error) {
        console.log("❌ Error al decodificar el token:", error);
        return res.status(403).send({ message: 'ErrorToken', error: error.message });
    }
};
