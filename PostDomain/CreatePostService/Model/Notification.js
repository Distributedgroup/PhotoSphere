var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = Schema({
    type: {type: String, required: true}, //Publicaciones - Solicitudes de amistad
    description: {type: String, required: true},
    state: {type: Boolean, default: false, required: true}, 
    user: {type: Schema.ObjectId, ref: 'user', required: true},
    user_interaction: {type: Schema.ObjectId, ref: 'user', required: true},

    post: {type: Schema.ObjectId, ref: 'post', required: false},
    user_friend: {type: Schema.ObjectId, ref: 'user_friend', required: false},

    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('notification',NotificationSchema);