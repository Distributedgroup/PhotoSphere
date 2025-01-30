var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User_friendSchema = Schema({
    user_origin: { type: Schema.ObjectId, ref: 'user', require: true },
    user_friend: { type: Schema.ObjectId, ref: 'user', require: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user_friend', User_friendSchema);