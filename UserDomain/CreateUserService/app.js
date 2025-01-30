require('dotenv').config(); // Cargar variables de entorno
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");

var app = express(); // 
const port = process.env.PORT || 5050;

const userRoutes = require('./routes/user'); 
app.use(express.json());  
app.use("/api", userRoutes); 

// Configurar Servidor con Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log('✅ Socket conectado');

    socket.on('send-invitacion', function (data) {
        io.emit('new-invitacion', data);
    });

    socket.on('set-invitacion', function (data) {
        io.emit('set-new-invitacion', data);
    });

    socket.on('on-notifacion', function (data) {
        io.emit('emit-notifacion', data);
    });
});

// Conectar a MongoDB en Docker en EC2
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:secret@ec2-18-207-77-6.compute-1.amazonaws.com:27017/userservice?authSource=admin";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) {
        console.error("❌ Error al conectar a MongoDB:", err);
    } else {
        httpServer.listen(port, function () {
            console.log("✅ Servidor corriendo en el puerto " + port);
            console.log("✅ Conectado a MongoDB en Docker en EC2");
        });
    }
});

// Configurar Middleware
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

module.exports = app;
