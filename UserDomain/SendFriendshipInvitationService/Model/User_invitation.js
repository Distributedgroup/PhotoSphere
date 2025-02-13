const mongoose = require('mongoose');

const MONGO_URI_2 = "mongodb://3.220.140.139:27017/userinvitation";

const mongoConn2 = mongoose.createConnection(MONGO_URI_2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Espera máxima de 5 segundos
});

mongoConn2.on('error', err => {
    console.error("❌ Error conectando a MongoDB 2 en User_invitation.js:", err);
});

mongoConn2.once('open', () => {
    console.log("✅ Conectado correctamente a MongoDB 2 en User_invitation.js");
});

const Schema = mongoose.Schema;

const User_invitationSchema = new Schema({
    user_origin: { type: Schema.ObjectId, ref: 'user', required: true },
    recipient_user: { type: Schema.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoConn2.model('UserInvitation', User_invitationSchema);
