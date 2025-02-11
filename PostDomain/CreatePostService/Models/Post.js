const mongoose = require('mongoose');
const { mongoConn2 } = require('../app'); // Importa mongoConn2 correctamente

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    extract: { type: String, required: true },
    content: { type: String, required: true },
    media: { type: String, required: false },
    type: { type: String, required: true }, // TEXTO, MEDIA, GRUPO
    privacy: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoConn2.model('post', PostSchema);
