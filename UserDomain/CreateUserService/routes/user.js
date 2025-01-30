var express = require('express');
var createUserController = require('../Controller/createUserController.js'); // ✅ Asegurar que la ruta es correcta
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({ uploadDir: './uploads/portadas' });

var router = express.Router();

if (!createUserController || !createUserController.create_user) {
    console.error("Error: create_user no está definido en createUserController");
}

router.post('/users', createUserController.create_user); // 

module.exports = router;
