var express = require('express');
var createUserController = require('../Controller/createUserController.js'); 
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({ uploadDir: './uploads/portadas' });

var router = express.Router();

// Ensure the function exists before using it
if (!createUserController || !createUserController.create_user) {
    console.error("Error: create_user is not defined in createUserController");
}

router.post('/users', createUserController.create_user);

module.exports = router;
