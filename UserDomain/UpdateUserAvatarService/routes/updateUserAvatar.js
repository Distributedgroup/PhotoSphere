var express = require('express');
var historiasController = require('../controllers/updateUserAvatarController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();


app.post('/update_user_avatar',[auth.auth,path],updateUserAvatarController.update_user_avatar);


module.exports = app;