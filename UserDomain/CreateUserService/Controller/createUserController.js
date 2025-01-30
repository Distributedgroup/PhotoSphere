require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const bcrypt = require("bcrypt");

var app = express();
const port = process.env.PORT || 5050;

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
        console.log("✅ CreateUserService conectado a MongoDB en EC2");

        // **Iniciar Servidor solo después de conectar a la base de datos**
        httpServer.listen(port, function () {
            console.log("✅ CreateUserService corriendo en el puerto " + port);
        });
    })
    .catch((err) => {
        console.error("❌ Error al conectar a MongoDB:", err);
    });

// **Configurar Servidor con Socket.io**
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("✅ Socket conectado en CreateUserService");
});

// Importar el modelo de usuario
const User = require("./Model/User");

// **Crear usuario en MongoDB con validación de email y encriptación de contraseña**
app.post("/api/users", async (req, res) => {
    try {
        const { names, surnames, email, password, profession, description } = req.body;

        // Verificar si el email ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El correo electrónico ya está registrado" });
        }

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({
            names,
            surnames,
            email,
            password: hashedPassword, // Guardar contraseña encriptada
            profession,
            description
        });

        await newUser.save();
        console.log("✅ User created:", newUser);

        // **Notificar a `UpdateUserService`**
        try {
            const response = await axios.post("http://localhost:5051/api/notify", { userId: newUser._id });
            console.log("🔔 Notificación enviada a UpdateUserService:", response.data);
        } catch (error) {
            console.error("❌ Error enviando notificación a UpdateUserService:", error.response ? error.response.data : error.message);
        }

        res.status(201).json({ message: "User created", data: newUser });
    } catch (error) {
        console.error("❌ Error creating user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = app;
