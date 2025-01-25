var express = require('express');
var historiasController = require('../controllers/acceptDenyInvitationController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir:'./uploads/stories'});


var app = express.Router();

app.get('/accept_deny_invitation/:type/:id',auth.auth,acceptDenyInvitationController.accept_deny_invitation);

module.exports = app;