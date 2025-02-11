const connections = require('../app');
const mongoConn2 = connections.mongoConn2;
const mongoose = require('mongoose');

mongoose.connect("mongodb://13.216.36.116:27017/socialP", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Conexión manual a MongoDB exitosa"))
    .catch(err => console.error("❌ Error en conexión manual a MongoDB:", err));


if (!mongoConn2) {
    throw new Error("❌ Error: mongoConn2 no está definido en Post.js");
}

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
