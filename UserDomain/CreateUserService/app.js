require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const { createServer } = require("http");
const axios = require("axios");
const bcrypt = require("bcrypt");
const cors = require("cors");

// ✅ Define la app correctamente antes de usarla
const app = express();
const port = process.env.PORT || 5050;

// ✅ Middleware
app.use(cors({
  origin: "*",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));

// Asegurar que el método OPTIONS responde correctamente
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});
// ✅ Middleware de parsing de JSON
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));
app.use(express.json());

// ✅ Conexión a MongoDB en Docker dentro de EC2
const MONGO_URI = process.env.MONGO_URI || "mongodb://52.1.158.25:27017/userservice";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ CreateUserService conectado a MongoDB en EC2");

        // ✅ Inicializar el servidor después de la conexión a la BD
        httpServer.listen(port, () => {
            console.log(`✅ CreateUserService corriendo en el puerto ${port}`);
        });
    })
    .catch((err) => {
        console.error("❌ Error conectando a MongoDB:", err);
    });

// ✅ Definir correctamente el servidor HTTP y Socket.io
const httpServer = createServer(app);
const { Server } = require("socket.io"); // Falta importar Server de socket.io
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("✅ Socket conectado en CreateUserService");
});

// ✅ Importar el modelo de usuario
const User = require("./Model/User");

// ✅ Ruta para crear un usuario con validación y encriptación de contraseña
app.post("/api/create_user", async (req, res) => {
    try {
        const { names, surnames, email, password, profession, description } = req.body;

        // Verificar si el email ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email ya está registrado" });
        }

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({
            names,
            surnames,
            email,
            password: hashedPassword,
            profession,
            description
        });

        await newUser.save();
        console.log("✅ Usuario creado:", newUser);

        // ✅ Notificar a `UpdateUserService`
        try {
            const response = await axios.post("http://localhost:5051/api/notify", { userId: newUser._id });
            console.log("🔔 Notificación enviada a UpdateUserService:", response.data);
        } catch (error) {
            console.error("❌ Error notificando a UpdateUserService:", error.response ? error.response.data : error.message);
        }

        res.status(201).json({ message: "Usuario creado con éxito", data: newUser });
    } catch (error) {
        console.error("❌ Error al crear usuario:", error);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
});

module.exports = app;
