var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = Schema({
    extract: {type: String, required: true},
    content: {type: String, required: true},
    media: {type: String, required: false},
    type: {type: String, required: true}, //TEXTO,MEDIA,GRUPO
    privacy: {type: String, required: true}, 
    user: {type: Schema.ObjectId, ref: 'user', required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('post',PostSchema);