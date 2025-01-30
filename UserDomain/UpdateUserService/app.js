require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

var app = express();
const port = process.env.PORT || 5051;

// Middleware
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));
app.use(express.json());

// Configurar CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

// **Conectar a MongoDB en Docker dentro de EC2**
const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:secret@ec2-18-207-77-6.compute-1.amazonaws.com:27017/userservice?authSource=admin";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ UpdateUserService conectado a MongoDB en EC2");

        // **Iniciar Servidor solo después de conectar a la base de datos**
        httpServer.listen(port, function () {
            console.log("✅ UpdateUserService corriendo en el puerto " + port);
        });
    })
    .catch((err) => {
        console.error("❌ Error al conectar a MongoDB:", err);
    });

// **Configurar Servidor con Socket.io**
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("✅ Socket conectado en UpdateUserService");
});

// **Ruta para recibir notificaciones desde CreateUserService**
app.post("/api/notify", async (req, res) => {
    console.log("🔔 Notificación recibida de CreateUserService:", req.body);

    if (!req.body.userId) {
        return res.status(400).json({ message: "Error: userId no recibido" });
    }

    res.status(200).json({ message: "Notificación recibida con éxito" });
});

module.exports = app;
