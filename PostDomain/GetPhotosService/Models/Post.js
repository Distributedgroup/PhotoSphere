const mongoose = require('mongoose');

const MONGO_URI_1 = "mongodb://13.216.36.116:27017/socialP"; // IP de la segunda base de datos
const mongoConn1 = mongoose.createConnection(MONGO_URI_1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoConn1.on('error', err => {
    console.error("❌ Error conectando a MongoDB 1 en Post.js:", err);
});

mongoConn1.once('open', () => {
    console.log("✅ Conectado correctamente a MongoDB 1 en Post.js");
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

module.exports = mongoConn1.model('post', PostSchema);
