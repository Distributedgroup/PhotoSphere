const mongoose = require('mongoose');
const connections = require('../app');
const mongoConn1 = connections.mongoConn1;

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    type: { type: String, required: true }, // Publicaciones - Solicitudes de amistad
    description: { type: String, required: true },
    state: { type: Boolean, default: false, required: true },
    user: { type: Schema.ObjectId, ref: 'user', required: true },
    user_interaction: { type: Schema.ObjectId, ref: 'user', required: true },
    post: { type: Schema.ObjectId, ref: 'post', required: false },
    user_friend: { type: Schema.ObjectId, ref: 'user_friend', required: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoConn1.model('notifications', NotificationSchema);
