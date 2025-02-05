require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var updateUserRoutes = require('./routes/updateUser');

const { createServer } = require("http");
const { Server } = require("socket.io");

var app = express();
const port = process.env.PORT || 5051;

// Middleware
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));
app.use(express.json());

// Configure CORS
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

// **Connecting to MongoDB in Docker inside EC2**
const MONGO_URI = process.env.MONGO_URI || "mongodb://52.1.158.25:27017/userservice";

app.use('/api', updateUserRoutes);

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("✅ UpdateUserService connected to MongoDB on EC2");

        // **Start Server only after connecting to database**
        httpServer.listen(port, function () {
            console.log("✅ UpdateUserService running on port " + port);
        });
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err);
    });

// **Setting up Server with Socket.io**
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("✅ Socket connected in UpdateUserService");
});

// **Route to receive notifications from CreateUserService**
app.post("/api/notify", async (req, res) => {
    console.log("🔔 Notification received from CreateUserService:", req.body);

    if (!req.body.userId) {
        return res.status(400).json({ message: "Error: userId not received" });
    }

    res.status(200).json({ message: "Notification received successfully" });
});

module.exports = app;
