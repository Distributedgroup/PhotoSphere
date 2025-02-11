const mongoose = require('mongoose');

const MONGO_URI_2 = "mongodb://13.216.36.116:27017/socialP"; // IP de la segunda base de datos
const mongoConn2 = mongoose.createConnection(MONGO_URI_2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoConn2.on('error', err => {
    console.error("❌ Error conectando a MongoDB 2 en Post.js:", err);
});

mongoConn2.once('open', () => {
    console.log("✅ Conectado correctamente a MongoDB 2 en Post.js");
});

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    extract: { type: String, required: true },
    content: { type: String, required: true },
    media: { type: String, required: false },
    type: { type: String, required: true },
    privacy: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoConn2.model('post', PostSchema);
