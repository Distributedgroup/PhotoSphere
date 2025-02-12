var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User_invitationSchema = Schema({
    user_origin: { type: Schema.ObjectId, ref: 'user', require: true },
    recipient_user: { type: Schema.ObjectId, ref: 'user', require: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user_invitation', User_invitationSchema);