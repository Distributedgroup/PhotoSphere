require('dotenv').config();
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");

var app = express();
const port = process.env.PORT || 5050;

const userRoutes = require('./routes/user');
app.use(express.json());
app.use("/api", userRoutes);

// Setting up Server with Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log('✅ Socket conectado');

    socket.on('send-invitacion', (data) => io.emit('new-invitacion', data));
    socket.on('set-invitacion', (data) => io.emit('set-new-invitacion', data));
    socket.on('on-notifacion', (data) => io.emit('emit-notifacion', data));
});

// Configuración de MongoDB con reintentos
const MONGO_URI = process.env.MONGO_URI || "mongodb://52.1.158.25:27017/userservice";

const connectWithRetry = () => {
    console.log("⏳ Intentando conectar a MongoDB...");
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,  // Reducimos el timeout para evitar esperas largas
        connectTimeoutMS: 10000, 
    })
    .then(() => {
        console.log("✅ Conectado a MongoDB en Docker en EC2");

        // Iniciar el servidor solo después de una conexión exitosa
        httpServer.listen(port, () => {
            console.log("✅ Servidor corriendo en el puerto " + port);
        });
    })
    .catch((err) => {
        console.error("❌ Error al conectar con MongoDB. Reintentando en 5 segundos...", err);
        setTimeout(connectWithRetry, 5000);  // Reintentar cada 5 segundos
    });
};

connectWithRetry();

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
