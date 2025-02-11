const mongoose = require('mongoose');

const MONGO_URI_1 = "mongodb://52.201.91.213:27017/socialN"; // IP de la segunda base de datos
const mongoConn1 = mongoose.createConnection(MONGO_URI_1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoConn1.on('error', err => {
    console.error("❌ Error conectando a MongoDB 1 en Notification.js:", err);
});

mongoConn1.once('open', () => {
    console.log("✅ Conectado correctamente a MongoDB 1 en Notification.js");
});


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
