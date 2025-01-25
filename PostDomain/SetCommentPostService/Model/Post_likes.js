var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post_likesSchema = Schema({
    post: {type: Schema.ObjectId, ref: 'post', required: true},
    user: {type: Schema.ObjectId, ref: 'user', required: true},
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('post_likes',Post_likesSchema);