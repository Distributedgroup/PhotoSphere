const jwt = require('jsonwebtoken');
const moment = require('moment');

const secret = process.env.JWT_SECRET || '6M5X#D6%7Nh*!pkR3HL7F@Fdx';  // Use an environment variable

exports.auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: 'NoHeadersError: Token not provided' });
        }

        const token = req.headers.authorization.replace(/['"]+/g, '').split(' ')[1]; 

        if (!token) {
            return res.status(403).send({ message: 'InvalidToken: Token not found' });
        }

        const payload = jwt.verify(token, secret); // Verify the token

        if (payload.exp <= moment().unix()) {
            return res.status(403).send({ message: 'TokenExpired' });
        }

        req.user = payload; // Save user info in the request
        next();
    } catch (error) {
        console.error("❌ JWT authentication error:", error);
        return res.status(403).send({ message: 'ErrorToken: Invalid token', error });
    }
};
