require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const { createServer } = require("http");
const axios = require("axios");
const bcrypt = require("bcrypt");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const port = process.env.PORT || 5050;

// ✅ Seguridad con Helmet (protege de ataques XSS, CSP, etc.)
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                connectSrc: ["*"], // Permite llamadas a APIs externas
            },
        },
    })
);

// ✅ Configurar correctamente CORS
const corsOptions = {
    origin: "*", // ⚠️ Puedes restringirlo a tus dominios en producción
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Kong-Proxy-Latency", "X-Kong-Upstream-Latency"],
    credentials: true,
};

app.use(cors(corsOptions));

// ✅ Middleware para que `OPTIONS` devuelva los encabezados de CORS correctamente
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});

// ✅ Middleware para procesar JSON y URL Encoded
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));
app.use(express.json());

// ✅ Conexión a MongoDB en Docker dentro de EC2
const MONGO_URI = process.env.MONGO_URI || "mongodb://52.1.158.25:27017/userservice";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✅ CreateUserService conectado a MongoDB en EC2");
    })
    .catch((err) => {
        console.error("❌ Error conectando a MongoDB:", err);
    });

// ✅ Inicializar el servidor HTTP después de definirlo correctamente
const httpServer = createServer(app);
httpServer.listen(port, () => {
    console.log(`✅ CreateUserService corriendo en el puerto ${port}`);
});

// ✅ Definir correctamente el servidor HTTP y Socket.io
const { Server } = require("socket.io");
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
            description,
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
