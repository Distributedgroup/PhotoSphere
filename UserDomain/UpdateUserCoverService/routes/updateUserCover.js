var express = require('express');
var historiasController = require('../controllers/updateUserCoverController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.post('/update_user_cover',[auth.auth,path],updateUserCoverController.update_user_cover);

module.exports = app;