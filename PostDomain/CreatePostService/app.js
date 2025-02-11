const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const mysql = require('mysql2/promise');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5063;
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

// 🔹 URLs de conexión (Cambia las IPs por las correctas)
const MONGO_URI_1 = "mongodb://52.201.91.213:27017/socialN";
const MONGO_URI_2 = "mongodb://13.216.36.116:27017/socialP";
const MYSQL_CONFIG = {
    host: "54.226.242.133",  // Cambia con la IP de la instancia EC2 de MySQL
    user: "root",
    password: "claveSegura@123",
    database: "socialUF",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// 🔹 Conexiones a MongoDB
const mongoConn1 = mongoose.createConnection(MONGO_URI_1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mongoConn2 = mongoose.createConnection(MONGO_URI_2, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 🔹 Conexión a MySQL
let mysqlPool;
(async () => {
    try {
        mysqlPool = await mysql.createPool(MYSQL_CONFIG);
        console.log("✅ Conectado a MySQL");
    } catch (error) {
        console.error("❌ Error conectando a MySQL:", error);
    }
})();

// 🔹 Manejo de errores en MongoDB
mongoConn1.on('error', console.error.bind(console, '❌ Error en MongoDB 1:'));
mongoConn2.on('error', console.error.bind(console, '❌ Error en MongoDB 2:'));

mongoConn1.once('open', () => console.log("✅ Conectado a MongoDB 1"));
mongoConn2.once('open', () => console.log("✅ Conectado a MongoDB 2"));

// 🔹 Middleware
app.use(cors());
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

// 🔹 Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// 🔹 Rutas de API
var createPost_routes = require('./routes/createPost');
app.use('/api', createPost_routes);

// 🔹 WebSockets con Socket.IO
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
    mongoConn1, // Base de datos `socialN`
    mongoConn2, // Base de datos `socialP`
    mysqlPool  // Base de datos `socialUF`
};
