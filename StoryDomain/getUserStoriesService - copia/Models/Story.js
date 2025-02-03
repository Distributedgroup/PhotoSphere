var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StorySchema = Schema({
    image: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'user', require: true },
    exp: { type: Date, require: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('story', StorySchema);