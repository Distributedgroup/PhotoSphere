var express = require('express');
var getUserInvitationsController = require('../Controller/getUserInvitationsController');
var auth = require('../middlewares/auth');
var multiparty = require('connect-multiparty');


var app = express.Router();

app.get('/get_user_invitations/:type',auth.auth,getUserInvitationsController.get_user_invitations);

module.exports = app;
