var User = require('../Model/User'); 
const bcrypt = require('bcrypt'); 

const saltRounds = 10; // 🔹 Definir el número de rondas para generar el salt

const reset_password = async function(req, res) {
    try {
        var email = req.params['email'];
        var data = req.body;

        var user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) {
                return res.status(500).send({ message: 'Error generando salt', error: err });
            }

            bcrypt.hash(data.password_new, salt, async function(err, hash) {
                if (err) {
                    return res.status(500).send({ message: 'Error generando hash', error: err });
                }

                await User.findByIdAndUpdate(user._id, {
                    password: hash
                });

                res.status(200).send({ message: 'Contraseña actualizada correctamente' });
            });
        });
    } catch (error) {
        res.status(500).send({ message: 'Error en el servidor', error });
    }
}

module.exports = {
    reset_password
};
