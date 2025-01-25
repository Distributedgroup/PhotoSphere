var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post_comentariosSchema = Schema({
    post: {type: Schema.ObjectId, ref: 'post', required: true},
    user: {type: Schema.ObjectId, ref: 'user', required: true},
    reply_id: {type: Schema.ObjectId, ref: 'post_comments', required: false},
    comments: {type: String, required: true},
    type: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('post_comments',Post_commentsSchema);