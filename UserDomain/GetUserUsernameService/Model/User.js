var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MONGO_URI_1 = "mongodb://52.1.158.25:27017/userservice"; // IP de la segunda base de datos
const mongoConn1 = mongoose.createConnection(MONGO_URI_1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoConn1.on('error', err => {
    console.error("❌ Error conectando a MongoDB 1 en User.js:", err);
});

mongoConn1.once('open', () => {
    console.log("✅ Conectado correctamente a MongoDB 1 en User.js");
});


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

module.exports = mongoose.model('user',UserSchema);
