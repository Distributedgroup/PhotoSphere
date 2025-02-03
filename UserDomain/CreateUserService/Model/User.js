var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    names: {type: String, required: true},
    surnames: {type: String, required: true},
    email: {type: String, required: true},
    country: {type: String, required: false},
    profession: {type: String, required: false},
    birth: {type: Date, required: false},
    gender:{type:String, require:false},
    phone: {type: String, required: false},
    avatar: {type: String, default: 'defecto.png', required: false},
    frontPage: {type: String, required: false},

    state: {type: Boolean, default: false, required: false},
    description: {type: String, required: false},
    username: {type: String, required: false},
    password: {type: String, required: true},
    code_reset: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('user',UserSchema)
