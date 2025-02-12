const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
//const { mongoConn1, mongoConn2 } = require('./database'); // Importamos las conexiones

const app = express();
const port = process.env.PORT || 5066;
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

const MONGO_URI_1 = "mongodb://52.1.158.25:27017/userservice";
// 🔹 Middleware
app.use(cors());
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

const userRoutes = require('./routes/getUserUsername'); 
app.use(express.json());  
app.use("/api", userRoutes); 

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});




// 🔹 WebSockets con Socket.IO
io.on("connection", (socket) => {
    console.log('✅ Socket conectado');
    socket.on('send-invitacion', (data) => io.emit('new-invitacion', data));
    socket.on('set-invitacion', (data) => io.emit('set-new-invitacion', data));
    socket.on('on-notifacion', (data) => io.emit('emit-notifacion', data));
});




const mongoConn1 = mongoose.createConnection(MONGO_URI_1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Verificar si mongoConn1 y mongoConn2 están definidos
if (!mongoConn1) {
    console.error("❌ Error: mongoConn1 no están definidos.");
    process.exit(1); // Detener la ejecución si hay error en la conexión
}

// 🔹 Manejo de eventos de conexión en MongoDB
mongoConn1.once('open', () => console.log("✅ Conectado a MongoDB 1"));

mongoConn1.on('error', (err) => console.error("❌ Error en MongoDB 1:", err));
// 🔹 Esperar conexiones a MongoDB antes de iniciar el servidor
setTimeout(() => {
    httpServer.listen(port, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${port}`);
    });
}, 5000); // Espera para evitar errores de conexión



// 🔹 Exportar conexiones para ser usadas en modelos
module.exports = {
    app,
    mongoConn1
};
