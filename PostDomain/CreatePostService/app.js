const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const { mongoConn1, mongoConn2 } = require('./database'); // Importamos las conexiones

const app = express();
const port = process.env.PORT || 5063;
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// 🔹 Middleware
app.use(cors());
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

// 🔹 WebSockets con Socket.IO
io.on("connection", (socket) => {
    console.log('✅ Socket conectado');
    socket.on('send-invitacion', (data) => io.emit('new-invitacion', data));
    socket.on('set-invitacion', (data) => io.emit('set-new-invitacion', data));
    socket.on('on-notifacion', (data) => io.emit('emit-notifacion', data));
});

// 🔹 Esperar conexiones a MongoDB antes de iniciar el servidor
Promise.all([
    mongoConn1.asPromise(),
    mongoConn2.asPromise()
]).then(() => {
    httpServer.listen(port, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${port}`);
    });
}).catch(err => {
    console.error("❌ Error inicializando bases de datos:", err);
});

// 🔹 Exportar conexiones para ser usadas en modelos
module.exports = {
    app,
    mongoConn1,
    mongoConn2
};
